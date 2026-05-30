"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, getDictionary } from "@/lib/dictionaries";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("app-language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "id")) {
      setLanguageState(savedLang);
    } else {
      // Default to ID if browser is ID, else EN
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("id")) {
        setLanguageState("id");
      }
    }
    setIsLoaded(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  };

  const t = (key: string, replacements?: Record<string, string>): string => {
    const dict = getDictionary(language);
    let text = dict[key] || key;

    if (replacements) {
      Object.entries(replacements).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v);
      });
    }

    return text;
  };

  // Ensure children render on server for SEO
  // Note: this may cause a minor hydration text mismatch if the client language 
  // differs from the default server language, but it's better than a blank screen.

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
