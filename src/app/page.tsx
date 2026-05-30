"use client";

import { Header } from "@/components/header";
import { ImageUpload } from "@/components/image-upload";
import { ReferenceObjectTip } from "@/components/reference-object-tip";
import { AnalysisLoading } from "@/components/analysis-loading";
import { FoodResults } from "@/components/food-results";
import { PortionAdjuster } from "@/components/portion-adjuster";
import { NutritionTable } from "@/components/nutrition-table";
import { NutritionSummary } from "@/components/nutrition-summary";
import { DailyTargetsPanel } from "@/components/daily-targets";
import { ConfidenceIndicator } from "@/components/confidence-indicator";
import { useAnalysis } from "@/hooks/use-analysis";
import { useDailyTargets } from "@/hooks/use-daily-targets";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { RotateCcw, Sparkles, ScanEye, Target, Shield } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const {
    state,
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
  } = useAnalysis();

  const {
    targets,
    consumed,
    isLoaded,
    setTargets,
    addConsumed,
    resetConsumed,
  } = useDailyTargets();

  return (
    <div className="flex min-h-screen flex-col bg-mesh overflow-x-hidden">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero Section */}
          {state === "idle" && !imagePreview && (
            <div className="mb-10 text-center space-y-4 animate-in fade-in duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-xs font-medium text-emerald-400">
                <Sparkles className="h-3.5 w-3.5" />
                {t("hero.badge")}
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                  {t("hero.title.1")}
                </span>
                <br />
                <span className="text-foreground">
                  {t("hero.title.2")}
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
                {t("hero.subtitle")}
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                {[
                  { icon: ScanEye, text: t("hero.feature.1") },
                  { icon: Target, text: t("hero.feature.2") },
                  { icon: Shield, text: t("hero.feature.3") },
                ].map((feature) => (
                  <div
                    key={feature.text}
                    className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    <feature.icon className="h-3.5 w-3.5 text-emerald-400" />
                    {feature.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Grid */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Left Column: Main Content */}
            <div className="lg:col-span-8 space-y-6">
              {/* Upload Section */}
              {(state === "idle" || state === "analyzing") && (
                <div className="space-y-4">
                  <ImageUpload
                    imagePreview={imagePreview}
                    onImageSelect={setImage}
                    onRemoveImage={removeImage}
                    onAnalyze={startAnalysis}
                    isAnalyzing={state === "analyzing"}
                    disabled={state === "analyzing"}
                  />

                  {state === "idle" && !imagePreview && (
                    <ReferenceObjectTip />
                  )}
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 animate-in fade-in duration-300">
                  <p className="text-sm font-medium text-red-400">
                    {error.message}
                  </p>
                </div>
              )}

              {/* Loading State */}
              {state === "analyzing" && <AnalysisLoading />}

              {/* Adjustment State */}
              {state === "adjusting" && analysisResult && (
                <div className="space-y-6">
                  {/* Image preview small */}
                  {imagePreview && (
                    <div className="relative overflow-hidden rounded-xl border border-white/10">
                      <div className="relative h-48 w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imagePreview}
                          alt="Analyzed meal"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      </div>
                    </div>
                  )}

                  <ConfidenceIndicator
                    foods={adjustedFoods}
                    referenceObject={analysisResult.reference_object}
                  />

                  <FoodResults
                    foods={adjustedFoods}
                    referenceObject={analysisResult.reference_object}
                  />

                  <PortionAdjuster
                    foods={adjustedFoods}
                    onAdjust={adjustPortion}
                    onConfirm={confirmPortions}
                  />
                </div>
              )}

              {/* Results State */}
              {state === "results" && totals && analysisResult && (
                <div className="space-y-6">
                  {/* Image preview small */}
                  {imagePreview && (
                    <div className="relative overflow-hidden rounded-xl border border-white/10">
                      <div className="relative h-40 w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imagePreview}
                          alt="Analyzed meal"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                        <div className="absolute bottom-3 left-4">
                          <p className="text-sm font-semibold text-white drop-shadow-lg">
                            {t("results.complete")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <NutritionSummary totals={totals} />

                  <NutritionTable foods={adjustedFoods} totals={totals} />

                  <ConfidenceIndicator
                    foods={adjustedFoods}
                    referenceObject={analysisResult.reference_object}
                  />

                  <Button
                    onClick={reset}
                    variant="outline"
                    className="w-full gap-2 border-white/15 hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-400 transition-colors h-11"
                    id="scan-again-btn"
                  >
                    <RotateCcw className="h-4 w-4" />
                    {t("results.scan_again")}
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Daily Targets */}
            <div className="lg:col-span-4 space-y-6">
              {isLoaded && (
                <div className="lg:sticky lg:top-24">
                  <DailyTargetsPanel
                    targets={targets}
                    consumed={consumed}
                    onSetTargets={setTargets}
                    onAddConsumed={addConsumed}
                    onResetConsumed={resetConsumed}
                    currentMealTotals={totals}
                    hasResults={state === "results"}
                  />

                  {/* Quick Stats */}
                  {consumed.calories > 0 && (
                    <div className="mt-4 rounded-xl border border-white/10 bg-card/50 p-4 space-y-3 animate-in fade-in duration-300">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t("targets.today")}
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-amber-500/10 p-2.5 text-center">
                          <p className="text-lg font-bold text-amber-400">
                            {consumed.calories}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {t("nutri.calories")}
                          </p>
                        </div>
                        <div className="rounded-lg bg-blue-500/10 p-2.5 text-center">
                          <p className="text-lg font-bold text-blue-400">
                            {consumed.protein}g
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {t("nutri.protein")}
                          </p>
                        </div>
                        <div className="rounded-lg bg-yellow-500/10 p-2.5 text-center">
                          <p className="text-lg font-bold text-yellow-400">
                            {consumed.carbs}g
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {t("nutri.carbs")}
                          </p>
                        </div>
                        <div className="rounded-lg bg-purple-500/10 p-2.5 text-center">
                          <p className="text-lg font-bold text-purple-400">
                            {consumed.fat}g
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {t("nutri.fat")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground">
            NutriScan AI — Powered by Google Gemini. Nutritional estimates are approximate.
            Always consult a professional for dietary advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
