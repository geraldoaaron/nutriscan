"use client";

import { useState } from "react";
import { Calculator, ChevronRight, Activity, Scale, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DailyTargets } from "@/lib/types";
import { useLanguage } from "@/components/language-provider";

interface TargetCalculatorProps {
  onApplyTargets: (targets: DailyTargets) => void;
}

export function TargetCalculator({ onApplyTargets }: TargetCalculatorProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [activity, setActivity] = useState("1.2"); // Default sedentary

  // Results State
  const [recommended, setRecommended] = useState<{
    calories: number;
    protein: number;
    bmr: number;
    tdee: number;
    goal: "gain" | "lose" | "maintain";
  } | null>(null);

  const calculateTargets = () => {
    const a = parseInt(age);
    const h = parseInt(height);
    const w = parseFloat(currentWeight);
    const tw = parseFloat(targetWeight);
    const act = parseFloat(activity);

    if (!a || !h || !w || !tw || !act) return;

    // Mifflin-St Jeor Equation for BMR
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = gender === "male" ? bmr + 5 : bmr - 161;

    // Total Daily Energy Expenditure (TDEE)
    const tdee = Math.round(bmr * act);

    let goal: "gain" | "lose" | "maintain" = "maintain";
    let targetCalories = tdee;

    // Calculate surplus/deficit based on weight difference
    if (tw > w) {
      goal = "gain";
      targetCalories = tdee + 500; // +500 kcal for ~0.5kg gain per week
    } else if (tw < w) {
      goal = "lose";
      targetCalories = tdee - 500; // -500 kcal for ~0.5kg loss per week
    }

    // Recommended protein: ~2g per kg of TARGET weight for muscle building/preservation
    const targetProtein = Math.round(tw * 2);

    setRecommended({
      calories: targetCalories,
      protein: targetProtein,
      bmr: Math.round(bmr),
      tdee,
      goal,
    });
    setStep(2);
  };

  const handleApply = () => {
    if (recommended) {
      onApplyTargets({
        calories: recommended.calories,
        protein: recommended.protein,
      });
      setIsOpen(false);
      // Reset state for next open
      setTimeout(() => setStep(1), 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="w-full gap-2 border-cyan-500/30 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
            id="open-calculator-btn"
          />
        }
      >
        <Calculator className="h-4 w-4" />
        {t("calc.btn")}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-cyan-400" />
            {t("calc.title")}
          </DialogTitle>
          <DialogDescription>
            {t("calc.desc")}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 1 ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">{t("calc.gender")}</Label>
                  <Select value={gender} onValueChange={(v) => { if (v) setGender(v as "male" | "female") }}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Pilih..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t("calc.male")}</SelectItem>
                      <SelectItem value="female">{t("calc.female")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">{t("calc.age")}</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="height">{t("calc.height")}</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="180"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentWeight">{t("calc.current_weight")}</Label>
                  <Input
                    id="currentWeight"
                    type="number"
                    placeholder="55"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetWeight">{t("calc.target_weight")}</Label>
                <Input
                  id="targetWeight"
                  type="number"
                  placeholder="70"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity">{t("calc.activity")}</Label>
                <Select value={activity} onValueChange={(v) => { if (v) setActivity(v) }}>
                  <SelectTrigger id="activity">
                    <SelectValue placeholder="Pilih aktivitas..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1.2">{t("calc.act.sedentary")}</SelectItem>
                    <SelectItem value="1.375">{t("calc.act.light")}</SelectItem>
                    <SelectItem value="1.55">{t("calc.act.moderate")}</SelectItem>
                    <SelectItem value="1.725">{t("calc.act.active")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white"
                onClick={calculateTargets}
                disabled={!age || !height || !currentWeight || !targetWeight}
              >
                {t("calc.calculate_now")} <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              {recommended && (
                <>
                  <div className="rounded-xl bg-muted/50 p-4 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Scale className="h-4 w-4 text-emerald-400" />
                      <h4 className="font-semibold text-sm">{t("calc.results")}</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">{t("calc.bmr")}</p>
                        <p className="font-semibold">{recommended.bmr} kcal</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">{t("calc.tdee")}</p>
                        <p className="font-semibold">{recommended.tdee} kcal</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/20 p-3 mt-3">
                      <div className="flex gap-2 items-start">
                        <Info className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-cyan-200/90 leading-relaxed">
                          {recommended.goal === "gain" && t("calc.gain_info", { tw: targetWeight })}
                          {recommended.goal === "lose" && t("calc.lose_info", { tw: targetWeight })}
                          {recommended.goal === "maintain" && t("calc.maintain_info")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">{t("calc.recommendation")}</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3 text-center">
                        <p className="text-2xl font-bold text-orange-400">{recommended.calories}</p>
                        <p className="text-xs text-muted-foreground mt-1">{t("nutri.calories")} (kcal)</p>
                      </div>
                      <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-3 text-center">
                        <p className="text-2xl font-bold text-blue-400">{recommended.protein}g</p>
                        <p className="text-xs text-muted-foreground mt-1">{t("nutri.protein")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      {t("common.back")}
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white" 
                      onClick={handleApply}
                    >
                      {t("calc.apply")}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
