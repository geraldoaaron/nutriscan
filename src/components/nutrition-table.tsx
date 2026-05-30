"use client";

import type { DetectedFood, NutritionTotals } from "@/lib/types";
import { useLanguage } from "@/components/language-provider";

interface NutritionTableProps {
  foods: DetectedFood[];
  totals: NutritionTotals;
}

export function NutritionTable({ foods, totals }: NutritionTableProps) {
  const { t } = useLanguage();
  return (
    <div className="space-y-2">
      <div className="flex justify-end sm:hidden px-1">
        <p className="text-[10px] text-muted-foreground animate-pulse">
          {t("nutri.swipe_hint")}
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-card shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="overflow-x-auto pb-1 custom-scrollbar">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">{t("nutri.food")}</th>
              <th className="px-4 py-3 font-medium text-right">{t("nutri.weight")}</th>
              <th className="px-4 py-3 font-medium text-right text-amber-400">{t("nutri.calories")}</th>
              <th className="px-4 py-3 font-medium text-right text-blue-400">{t("nutri.protein")}</th>
              <th className="px-4 py-3 font-medium text-right text-purple-400">{t("nutri.fat")}</th>
              <th className="px-4 py-3 font-medium text-right text-yellow-400">{t("nutri.carbs")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {foods.map((food) => (
              <tr
                key={food.id}
                className="transition-colors hover:bg-muted/30"
              >
                <td className="px-4 py-3 font-medium text-foreground truncate max-w-[120px] sm:max-w-[200px]">
                  {food.name}
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">
                  {food.estimated_weight_grams}g
                </td>
                <td className="px-4 py-3 text-right font-medium text-amber-400/90">
                  {food.calories}
                </td>
                <td className="px-4 py-3 text-right text-blue-400/90">
                  {food.protein}g
                </td>
                <td className="px-4 py-3 text-right text-purple-400/90">
                  {food.fat}g
                </td>
                <td className="px-4 py-3 text-right text-yellow-400/90">
                  {food.carbs}g
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-muted/30 font-semibold">
            <tr>
              <td className="px-4 py-3 text-foreground">{t("common.total")}</td>
              <td className="px-4 py-3 text-right text-foreground">
                {foods.reduce((acc, food) => acc + food.estimated_weight_grams, 0)}g
              </td>
              <td className="px-4 py-3 text-right text-amber-400">{totals.calories}</td>
              <td className="px-4 py-3 text-right text-blue-400">{totals.protein}g</td>
              <td className="px-4 py-3 text-right text-purple-400">{totals.fat}g</td>
              <td className="px-4 py-3 text-right text-yellow-400">{totals.carbs}g</td>
            </tr>
          </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
