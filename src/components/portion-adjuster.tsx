"use client";

import { Minus, Plus, Check, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DetectedFood } from "@/lib/types";
import { useLanguage } from "@/components/language-provider";

const STEP = 10;

interface PortionAdjusterProps {
  foods: DetectedFood[];
  onAdjust: (foodId: string, newWeight: number) => void;
  onConfirm: () => void;
}

export function PortionAdjuster({
  foods,
  onAdjust,
  onConfirm,
}: PortionAdjusterProps) {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2">
        <Scale className="h-4 w-4 text-cyan-400" />
        <h3 className="text-sm font-semibold text-foreground">
          {t("adjust.title")}
        </h3>
        <span className="text-xs text-muted-foreground ml-auto">
          {t("adjust.desc")}
        </span>
      </div>

      <div className="space-y-3">
        {foods.map((food, index) => (
          <div
            key={food.id}
            className="rounded-xl border border-white/10 bg-card/50 p-4 space-y-3 transition-all hover:bg-card/80 animate-in fade-in slide-in-from-left duration-300"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {language === 'id' ? food.name_id || (food as any).name || food.name_en : food.name_en || (food as any).name || food.name_id}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("adjust.estimated")} {food.original_weight_grams}g
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg border-white/15 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-colors"
                  onClick={() =>
                    onAdjust(
                      food.id,
                      Math.max(1, food.estimated_weight_grams - STEP)
                    )
                  }
                  id={`decrease-${food.id}`}
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>

                <div className="relative">
                  <Input
                    type="number"
                    min={1}
                    value={food.estimated_weight_grams}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0) {
                        onAdjust(food.id, val);
                      }
                    }}
                    className="h-8 w-20 text-center text-sm font-semibold border-white/15 bg-background/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    id={`weight-input-${food.id}`}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground pointer-events-none">
                    g
                  </span>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-lg border-white/15 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
                  onClick={() =>
                    onAdjust(food.id, food.estimated_weight_grams + STEP)
                  }
                  id={`increase-${food.id}`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Mini nutrition preview */}
            <div className="flex gap-3 text-[11px] text-muted-foreground">
              <span>
                🔥 {food.calories} kcal
              </span>
              <span>
                💪 {food.protein}g {t("nutri.protein").toLowerCase()}
              </span>
              <span>
                🫒 {food.fat}g {t("nutri.fat").toLowerCase()}
              </span>
              <span>
                ⚡ {food.carbs}g {t("nutri.carbs").toLowerCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={onConfirm}
        className="w-full gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 h-11"
        id="confirm-portions-btn"
      >
        <Check className="h-4 w-4" />
        {t("adjust.confirm")}
      </Button>
    </div>
  );
}
