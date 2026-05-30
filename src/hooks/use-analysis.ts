"use client";

import { useState, useCallback } from "react";
import type {
  AnalysisResult,
  AnalysisState,
  AnalysisError,
  DetectedFood,
  NutritionTotals,
} from "@/lib/types";
import {
  recalculateNutrition,
  calculateTotals,
} from "@/lib/nutrition-calculator";
import { useLanguage } from "@/components/language-provider";

export function useAnalysis() {
  const { language } = useLanguage();
  const [state, setState] = useState<AnalysisState>("idle");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [adjustedFoods, setAdjustedFoods] = useState<DetectedFood[]>([]);
  const [totals, setTotals] = useState<NutritionTotals | null>(null);
  const [error, setError] = useState<AnalysisError | null>(null);

  const setImage = useCallback((file: File | null) => {
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  }, []);

  const removeImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setState("idle");
    setAnalysisResult(null);
    setAdjustedFoods([]);
    setTotals(null);
    setError(null);
  }, []);

  const startAnalysis = useCallback(async () => {
    if (!imageFile) {
      setError({ message: "Please upload an image first" });
      return;
    }

    setState("analyzing");
    setError(null);

    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // Remove the data URL prefix to get pure base64
          const base64Data = result.split(",")[1];
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: base64,
          mimeType: imageFile.type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      const result = data as AnalysisResult;
      setAnalysisResult(result);
      setAdjustedFoods(result.foods);
      setTotals(result.totals);
      setState("adjusting");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError({ message });
      setState("idle");
    }
  }, [imageFile]);

  const adjustPortion = useCallback(
    (foodId: string, newWeight: number) => {
      setAdjustedFoods((prev) => {
        const updated = prev.map((food) =>
          food.id === foodId
            ? recalculateNutrition(food, Math.max(1, newWeight))
            : food
        );
        setTotals(calculateTotals(updated));
        return updated;
      });
    },
    []
  );

  const confirmPortions = useCallback(() => {
    const finalTotals = calculateTotals(adjustedFoods);
    setTotals(finalTotals);
    setState("results");
  }, [adjustedFoods]);

  const reset = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setState("idle");
    setAnalysisResult(null);
    setAdjustedFoods([]);
    setTotals(null);
    setError(null);
  }, []);

  return {
    state,
    imageFile,
    imagePreview,
    analysisResult,
    adjustedFoods,
    totals,
    error,
    setImage,
    removeImage,
    startAnalysis,
    adjustPortion,
    confirmPortions,
    reset,
  };
}
