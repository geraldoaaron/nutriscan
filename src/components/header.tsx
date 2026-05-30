"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, ScanEye, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/25">
            <ScanEye className="h-5 w-5 text-white" />
            <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-background animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              {t("header.title")}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Nutrition Analyzer
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === "en" ? "id" : "en")}
                className="relative h-9 w-9 rounded-lg hover:bg-white/5"
                id="language-toggle"
                title={t("header.lang.switch")}
              >
                <Languages className="h-4 w-4 text-emerald-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative h-9 w-9 rounded-lg hover:bg-white/5"
                id="theme-toggle"
                title={theme === "dark" ? t("header.theme.light") : t("header.theme.dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-yellow-400 transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-700 transition-transform hover:-rotate-45" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
