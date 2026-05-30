"use client";

import { Badge } from "@/components/ui/badge";
import { Scan, Crosshair } from "lucide-react";
import type { DetectedFood, ReferenceObject } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

function getConfidenceColor(confidence: number): string {
  if (confidence >= 85) return "text-emerald-400 bg-emerald-500/15 border-emerald-500/30";
  if (confidence >= 60) return "text-amber-400 bg-amber-500/15 border-amber-500/30";
  return "text-red-400 bg-red-500/15 border-red-500/30";
}

interface FoodResultsProps {
  foods: DetectedFood[];
  referenceObject: ReferenceObject | null;
}

export function FoodResults({ foods, referenceObject }: FoodResultsProps) {
  const { t } = useLanguage();

  function getConfidenceLabel(confidence: number): string {
    if (confidence >= 85) return t("conf.high");
    if (confidence >= 60) return t("conf.medium");
    return t("conf.low");
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Reference Object Detection */}
      {referenceObject && (
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl border px-4 py-3",
            referenceObject.detected
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-white/10 bg-card/50"
          )}
        >
          <Crosshair
            className={cn(
              "h-4 w-4 shrink-0",
              referenceObject.detected ? "text-emerald-400" : "text-muted-foreground"
            )}
          />
          <div className="flex-1 text-sm">
            {referenceObject.detected ? (
              <span className="text-emerald-300">
                {t("ref.detected")}{" "}
                <span className="font-semibold capitalize">
                  {referenceObject.name.replace(/_/g, " ")}
                </span>
                <span className="ml-1 text-emerald-400/70">
                  ({referenceObject.confidence}%)
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">
                {t("ref.not_detected")}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Detected Foods Header */}
      <div className="flex items-center gap-2">
        <Scan className="h-4 w-4 text-emerald-400" />
        <h3 className="text-sm font-semibold text-foreground">
          {t("results.detected")}
        </h3>
        <Badge
          variant="secondary"
          className="ml-auto text-xs bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
        >
          {foods.length} {foods.length !== 1 ? t("results.items") : t("results.item")}
        </Badge>
      </div>

      {/* Food Cards */}
      <div className="space-y-2">
        {foods.map((food, index) => (
          <div
            key={food.id}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-card/50 px-4 py-3 transition-colors hover:bg-card/80 animate-in fade-in slide-in-from-left duration-300"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-sm font-bold text-emerald-400">
              {index + 1}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {food.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {food.estimated_weight_grams}g
              </p>
            </div>

            <Badge
              variant="outline"
              className={cn(
                "shrink-0 text-[10px] font-semibold",
                getConfidenceColor(food.confidence)
              )}
            >
              {getConfidenceLabel(food.confidence)} {food.confidence}%
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
