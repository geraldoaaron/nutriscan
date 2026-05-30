import type { DetectedFood, NutritionTotals } from "./types";

/**
 * Recalculate nutrition values proportionally based on adjusted weight.
 * Uses the ratio of new weight to original AI-estimated weight.
 */
export function recalculateNutrition(
  food: DetectedFood,
  newWeight: number
): DetectedFood {
  const ratio = newWeight / food.original_weight_grams;

  return {
    ...food,
    estimated_weight_grams: newWeight,
    calories: Math.round(
      (food.calories / food.estimated_weight_grams) *
        food.original_weight_grams *
        ratio
    ),
    protein: parseFloat(
      (
        (food.protein / food.estimated_weight_grams) *
        food.original_weight_grams *
        ratio
      ).toFixed(1)
    ),
    fat: parseFloat(
      (
        (food.fat / food.estimated_weight_grams) *
        food.original_weight_grams *
        ratio
      ).toFixed(1)
    ),
    carbs: parseFloat(
      (
        (food.carbs / food.estimated_weight_grams) *
        food.original_weight_grams *
        ratio
      ).toFixed(1)
    ),
  };
}

/**
 * Calculate total nutrition from an array of foods.
 */
export function calculateTotals(foods: DetectedFood[]): NutritionTotals {
  return foods.reduce(
    (totals, food) => ({
      calories: totals.calories + food.calories,
      protein: parseFloat((totals.protein + food.protein).toFixed(1)),
      fat: parseFloat((totals.fat + food.fat).toFixed(1)),
      carbs: parseFloat((totals.carbs + food.carbs).toFixed(1)),
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 }
  );
}
