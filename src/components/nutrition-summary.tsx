"use client";

import { useEffect, useState } from "react";
import { Flame, Dumbbell, Zap, Droplets } from "lucide-react";
import type { NutritionTotals } from "@/lib/types";
import { useLanguage } from "@/components/language-provider";

interface StatCardProps {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  gradient: string;
  shadowColor: string;
  delay: number;
}

function AnimatedNumber({ target, duration = 1000 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = startValue + (target - startValue) * eased;
      setCurrent(Math.round(value * 10) / 10);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <>{Number.isInteger(target) ? Math.round(current) : current.toFixed(1)}</>;
}

function StatCard({ label, value, unit, icon, gradient, shadowColor, delay }: StatCardProps) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-white/20 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Background glow */}
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full ${gradient} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`} />

      <div className="relative flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold tracking-tight text-foreground">
              <AnimatedNumber target={value} />
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {unit}
            </span>
          </div>
        </div>

        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${gradient} shadow-lg ${shadowColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface NutritionSummaryProps {
  totals: NutritionTotals;
}

export function NutritionSummary({ totals }: NutritionSummaryProps) {
  const { t } = useLanguage();

  const stats: Omit<StatCardProps, "delay">[] = [
    {
      label: t("nutri.total_cal"),
      value: totals.calories,
      unit: "kcal",
      icon: <Flame className="h-5 w-5 text-white" />,
      gradient: "bg-gradient-to-br from-orange-500 to-red-500",
      shadowColor: "shadow-orange-500/25",
    },
    {
      label: t("nutri.total_pro"),
      value: totals.protein,
      unit: "g",
      icon: <Dumbbell className="h-5 w-5 text-white" />,
      gradient: "bg-gradient-to-br from-blue-500 to-indigo-500",
      shadowColor: "shadow-blue-500/25",
    },
    {
      label: t("nutri.total_carb"),
      value: totals.carbs,
      unit: "g",
      icon: <Zap className="h-5 w-5 text-white" />,
      gradient: "bg-gradient-to-br from-yellow-500 to-amber-500",
      shadowColor: "shadow-yellow-500/25",
    },
    {
      label: t("nutri.total_fat"),
      value: totals.fat,
      unit: "g",
      icon: <Droplets className="h-5 w-5 text-white" />,
      gradient: "bg-gradient-to-br from-purple-500 to-violet-500",
      shadowColor: "shadow-purple-500/25",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} {...stat} delay={index * 100} />
      ))}
    </div>
  );
}
