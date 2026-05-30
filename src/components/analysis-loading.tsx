"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ScanEye } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

export function AnalysisLoading() {
  const { t } = useLanguage();
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      {/* Scanning animation */}
      <div className="relative flex flex-col items-center justify-center gap-4 py-8">
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
            <ScanEye className="h-8 w-8 text-emerald-400 animate-pulse" />
          </div>
          <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 animate-ping" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-base font-semibold text-foreground animate-pulse">
            {t("loading.title")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("loading.subtitle")}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs overflow-hidden rounded-full bg-muted h-1.5">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-loading-bar" />
        </div>
      </div>

      {/* Skeleton food cards */}
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-white/10 bg-card/50 p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-8 w-24 rounded-lg" />
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
