export interface ReferenceObject {
  name: string;
  detected: boolean;
  confidence: number;
}

export interface DetectedFood {
  id: string;
  name: string;
  category?: string;
  estimated_weight_grams: number;
  original_weight_grams: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  confidence: number;
}

export interface NutritionTotals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export interface AnalysisResult {
  reference_object: ReferenceObject | null;
  foods: DetectedFood[];
  totals: NutritionTotals;
}

export interface DailyTargets {
  calories: number;
  protein: number;
}

export interface DailyConsumed {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export type AnalysisState =
  | "idle"
  | "uploading"
  | "analyzing"
  | "adjusting"
  | "results";

export interface AnalysisError {
  message: string;
  code?: string;
}
