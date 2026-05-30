import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { getSystemPrompt, getUserPrompt } from "@/lib/prompts";
import type { AnalysisResult, DetectedFood } from "@/lib/types";

export const dynamic = "force-dynamic";

function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

const MODELS = ["gemini-2.0-flash", "gemini-2.5-flash"];
const MAX_RETRIES = 0; // Fail fast on rate limits instead of making the user wait 30 seconds
const RETRY_DELAY_MS = 1000;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function analyzeWithModel(
  genAI: GoogleGenerativeAI,
  modelName: string,
  image: string,
  mimeType: string,
  language: string
) {
  const model = genAI.getGenerativeModel({ model: modelName });

  const result = await model.generateContent([
    {
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: image,
      },
    },
    {
      text: `${getSystemPrompt(language)}\n\n${getUserPrompt(language)}`,
    },
  ]);

  const response = result.response;
  return response.text();
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          error:
            "GEMINI_API_KEY is not configured. Please add it to your .env.local file. Get a free key at https://aistudio.google.com/apikey",
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { image, mimeType, language = 'en' } = body as {
      image: string;
      mimeType: string;
      language?: string;
    };

    if (!image) {
      return Response.json({ error: "No image provided" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    let text: string | null = null;
    let lastError: Error | null = null;

    // Try each model with retries
    for (const modelName of MODELS) {
      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        try {
          text = await analyzeWithModel(genAI, modelName, image, mimeType, language);
          break; // Success, exit retry loop
        } catch (err) {
          lastError = err instanceof Error ? err : new Error(String(err));
          const errorMessage = lastError.message;

          // If rate limited (429), wait and retry
          if (errorMessage.includes("429") || errorMessage.includes("quota")) {
            console.warn(
              `Rate limited on ${modelName} (attempt ${attempt + 1}/${MAX_RETRIES + 1}). Retrying in ${RETRY_DELAY_MS}ms...`
            );
            if (attempt < MAX_RETRIES) {
              await sleep(RETRY_DELAY_MS * (attempt + 1));
              continue;
            }
            // If all retries exhausted for this model, try next model
            console.warn(`All retries exhausted for ${modelName}, trying next model...`);
            break;
          }

          // For non-rate-limit errors, try next model immediately
          console.warn(`Error with ${modelName}: ${errorMessage}`);
          break;
        }
      }

      if (text) break; // Got a successful response, stop trying models
    }

    if (!text) {
      const isRateLimit =
        lastError?.message?.includes("429") ||
        lastError?.message?.includes("quota");

      if (isRateLimit) {
        return Response.json(
          {
            error:
              "API rate limit reached. The free tier has limited requests per minute/day. Please wait 30-60 seconds and try again, or check your quota at https://ai.dev/rate-limit",
          },
          { status: 429 }
        );
      }

      throw lastError || new Error("Failed to analyze image with all models");
    }

    // Clean up response - remove markdown code blocks if present
    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText.slice(7);
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.slice(3);
    }
    if (cleanedText.endsWith("```")) {
      cleanedText = cleanedText.slice(0, -3);
    }
    cleanedText = cleanedText.trim();

    const parsed = JSON.parse(cleanedText);

    // Validate and transform response
    const analysisResult: AnalysisResult = {
      reference_object: parsed.reference_object || null,
      foods: (parsed.foods || []).map(
        (food: Omit<DetectedFood, "id" | "original_weight_grams">) => ({
          ...food,
          id: generateId(),
          original_weight_grams: food.estimated_weight_grams,
        })
      ),
      totals: parsed.totals || {
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
      },
    };

    return Response.json(analysisResult);
  } catch (error) {
    console.error("Analysis error:", error);

    if (error instanceof SyntaxError) {
      return Response.json(
        {
          error:
            "Failed to parse AI response. Please try again with a clearer food image.",
        },
        { status: 422 }
      );
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
