"use client";

import { useState, useEffect, useCallback } from "react";
import type { DailyTargets, DailyConsumed } from "@/lib/types";

const STORAGE_KEY_TARGETS = "nutriscan-daily-targets";
const STORAGE_KEY_CONSUMED = "nutriscan-daily-consumed";
const STORAGE_KEY_DATE = "nutriscan-date";

const DEFAULT_TARGETS: DailyTargets = {
  calories: 2500,
  protein: 150,
};

const DEFAULT_CONSUMED: DailyConsumed = {
  calories: 0,
  protein: 0,
  carbs: 0,
  fat: 0,
};

function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function useDailyTargets() {
  const [targets, setTargetsState] = useState<DailyTargets>(DEFAULT_TARGETS);
  const [consumed, setConsumedState] = useState<DailyConsumed>(DEFAULT_CONSUMED);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedDate = localStorage.getItem(STORAGE_KEY_DATE);
      const today = getTodayString();

      // Reset consumed if it's a new day
      if (storedDate !== today) {
        localStorage.setItem(STORAGE_KEY_DATE, today);
        localStorage.setItem(
          STORAGE_KEY_CONSUMED,
          JSON.stringify(DEFAULT_CONSUMED)
        );
        setConsumedState(DEFAULT_CONSUMED);
      } else {
        const storedConsumed = localStorage.getItem(STORAGE_KEY_CONSUMED);
        if (storedConsumed) {
          setConsumedState(JSON.parse(storedConsumed));
        }
      }

      const storedTargets = localStorage.getItem(STORAGE_KEY_TARGETS);
      if (storedTargets) {
        setTargetsState(JSON.parse(storedTargets));
      }
    } catch {
      // localStorage not available
    }
    setIsLoaded(true);
  }, []);

  const setTargets = useCallback((newTargets: DailyTargets) => {
    setTargetsState(newTargets);
    try {
      localStorage.setItem(STORAGE_KEY_TARGETS, JSON.stringify(newTargets));
    } catch {
      // localStorage not available
    }
  }, []);

  const addConsumed = useCallback(
    (addition: { calories: number; protein: number; carbs: number; fat: number }) => {
      setConsumedState((prev) => {
        const updated: DailyConsumed = {
          calories: prev.calories + addition.calories,
          protein: parseFloat((prev.protein + addition.protein).toFixed(1)),
          carbs: parseFloat((prev.carbs + addition.carbs).toFixed(1)),
          fat: parseFloat((prev.fat + addition.fat).toFixed(1)),
        };
        try {
          localStorage.setItem(STORAGE_KEY_CONSUMED, JSON.stringify(updated));
        } catch {
          // localStorage not available
        }
        return updated;
      });
    },
    []
  );

  const resetConsumed = useCallback(() => {
    setConsumedState(DEFAULT_CONSUMED);
    try {
      localStorage.setItem(
        STORAGE_KEY_CONSUMED,
        JSON.stringify(DEFAULT_CONSUMED)
      );
    } catch {
      // localStorage not available
    }
  }, []);

  return {
    targets,
    consumed,
    isLoaded,
    setTargets,
    addConsumed,
    resetConsumed,
  };
}
