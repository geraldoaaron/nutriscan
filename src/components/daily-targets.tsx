"use client";

import { useState } from "react";
import { Target, Plus, Edit3, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DailyTargets, NutritionTotals } from "@/lib/types";
import { useLanguage } from "@/components/language-provider";
import { TargetCalculator } from "./target-calculator";
import { cn } from "@/lib/utils";

interface DailyTargetsProps {
  targets: DailyTargets;
  consumed: NutritionTotals;
  onSetTargets: (targets: DailyTargets) => void;
  onAddConsumed: (totals: NutritionTotals) => void;
  onResetConsumed: () => void;
  currentMealTotals: NutritionTotals | null;
  hasResults: boolean;
}

export function DailyTargetsPanel({
  targets,
  consumed,
  onSetTargets,
  onAddConsumed,
  onResetConsumed,
  currentMealTotals,
  hasResults,
}: DailyTargetsProps) {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTargets, setTempTargets] = useState<DailyTargets>(targets);

  // Auto-close editing mode when a scan result comes in so the user sees the "Add to total" button
  if (hasResults && isEditing) {
    setIsEditing(false);
  }

  const calProgress = Math.min(100, Math.round((consumed.calories / targets.calories) * 100));
  const proProgress = Math.min(100, Math.round((consumed.protein / targets.protein) * 100));

  const isCalOver = consumed.calories > targets.calories;
  const isProOver = consumed.protein > targets.protein;

  return (
    <div className="rounded-2xl border border-white/10 bg-card/80 p-5 shadow-xl backdrop-blur-sm animate-in fade-in duration-500">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
            <Target className="h-4 w-4 text-emerald-400" />
          </div>
          <h3 className="font-semibold text-foreground">{t("targets.title")}</h3>
        </div>
        
        {!isEditing && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onResetConsumed}
              className="h-8 w-8 text-muted-foreground hover:text-red-400"
              title="Reset Today's Macros"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setTempTargets(targets);
                setIsEditing(true);
              }}
              className="h-8 w-8 text-muted-foreground hover:text-emerald-400"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4 animate-in slide-in-from-right-2 duration-300">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              {t("targets.cal_target")}
            </label>
            <Input
              type="number"
              value={tempTargets.calories}
              onChange={(e) => setTempTargets({ ...tempTargets, calories: Number(e.target.value) })}
              className="border-white/15 bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              {t("targets.pro_target")}
            </label>
            <Input
              type="number"
              value={tempTargets.protein}
              onChange={(e) => setTempTargets({ ...tempTargets, protein: Number(e.target.value) })}
              className="border-white/15 bg-background/50"
            />
          </div>
          <Button 
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            onClick={() => {
              onSetTargets(tempTargets);
              setIsEditing(false);
            }}
          >
            {t("targets.save")}
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Calories Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-muted-foreground">{t("nutri.calories")}</span>
              <span className="font-semibold">
                <span className={isCalOver ? "text-red-400" : "text-amber-400"}>
                  {consumed.calories}
                </span>
                <span className="text-muted-foreground"> / {targets.calories} kcal</span>
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${
                  isCalOver ? "bg-red-500" : "bg-gradient-to-r from-amber-500 to-orange-400"
                }`}
                style={{ width: `${calProgress}%` }}
              />
            </div>
          </div>

          {/* Protein Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-muted-foreground">{t("nutri.protein")}</span>
              <span className="font-semibold">
                <span className={isProOver ? "text-emerald-400" : "text-blue-400"}>
                  {consumed.protein}
                </span>
                <span className="text-muted-foreground"> / {targets.protein} g</span>
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${
                  isProOver ? "bg-emerald-500" : "bg-gradient-to-r from-blue-500 to-indigo-400"
                }`}
                style={{ width: `${proProgress}%` }}
              />
            </div>
          </div>

          <div className="pt-2">
            <TargetCalculator onApplyTargets={onSetTargets} />
          </div>

          {hasResults && currentMealTotals && (
            <div className="pt-2">
              <Button
                onClick={() => onAddConsumed(currentMealTotals)}
                className="w-full gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:text-emerald-300 h-auto py-2.5 whitespace-normal text-center leading-tight"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
                {t("targets.add_meal")}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
