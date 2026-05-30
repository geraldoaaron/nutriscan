"use client";

import { Shield, ShieldCheck, ShieldAlert, ShieldX, Eye, Crosshair, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DetectedFood, ReferenceObject } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";

interface ConfidenceIndicatorProps {
  foods: DetectedFood[];
  referenceObject: ReferenceObject | null;
}

export function ConfidenceIndicator({ foods, referenceObject }: ConfidenceIndicatorProps) {
  const { t } = useLanguage();

  if (foods.length === 0) return null;

  const avgFoodConfidence = foods.reduce((acc, f) => acc + f.confidence, 0) / foods.length;
  const refObjectScore = referenceObject?.detected ? referenceObject.confidence : 0;
  const complexityScore = Math.max(60, 100 - ((foods.length - 1) * 5));

  const compositeScore = Math.round(
    (avgFoodConfidence * 0.5) + (refObjectScore * 0.3) + (complexityScore * 0.2)
  );

  let config = {
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    label: t("conf.high"),
  };

  if (compositeScore < 60) {
    config = {
      icon: ShieldX,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      label: t("conf.low"),
    };
  } else if (compositeScore < 80) {
    config = {
      icon: ShieldAlert,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      label: t("conf.medium"),
    };
  }

  const Icon = config.icon;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "flex items-center gap-2 rounded-xl border px-4 py-3 cursor-pointer transition-colors w-full text-left outline-none",
          config.bg,
          config.border
        )}
      >
        <div className={cn("rounded-full p-1", config.bg)}>
          <Icon className={cn("h-4 w-4", config.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("text-xs font-semibold leading-tight", config.color)}>
            {t("conf.overall")} {config.label}
          </p>
          <p className="text-[10px] text-muted-foreground mt-1 truncate">
            {t("conf.factors")} {compositeScore}%
          </p>
        </div>
      </PopoverTrigger>
      
      <PopoverContent side="top" className="flex flex-col items-stretch w-64 space-y-2 p-3 bg-card border border-white/10">
        <p className="font-semibold text-xs text-foreground mb-2">{t("conf.breakdown")}</p>
        
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Eye className="h-3.5 w-3.5" />
            <span>{t("conf.ai_recognition")}</span>
          </div>
          <span className="font-medium text-foreground">{Math.round(avgFoodConfidence)}%</span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Crosshair className="h-3.5 w-3.5" />
            <span>{t("conf.size_reference")}</span>
          </div>
          <span className="font-medium text-foreground">
            {referenceObject?.detected ? `${referenceObject.confidence}%` : t("conf.none")}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <UtensilsCrossed className="h-3.5 w-3.5" />
            <span>{t("conf.meal_complexity")}</span>
          </div>
          <span className="font-medium text-foreground">{complexityScore}% ({foods.length} {t("conf.items")})</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
