"use client";

import Script from "next/script";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Language = "hi" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement?: new (
          options: Record<string, unknown>,
          elementId: string
        ) => unknown;
      };
    };
  }
}

function applyGoogleLanguage(lang: Language) {
  if (typeof window === "undefined") return;

  const value = `/hi/${lang}`;
  document.cookie = `googtrans=${value}; path=/`;
  document.cookie = `googtrans=${value}; domain=${window.location.hostname}; path=/`;

  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (combo) {
    combo.value = lang;
    combo.dispatchEvent(new Event("change"));
  } else {
    window.location.reload();
  }
}

function getSavedLanguage(): Language {
  if (typeof window === "undefined") return "hi";
  const stored = window.localStorage.getItem("site-language");
  return stored === "en" ? "en" : "hi";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("hi");
  const [translatorReady, setTranslatorReady] = useState(false);

  useEffect(() => {
    const saved = getSavedLanguage();
    setLanguageState(saved);
  }, []);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "hi",
          includedLanguages: "hi,en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
      setTranslatorReady(true);
    };
  }, []);

  useEffect(() => {
    if (!translatorReady) return;
    applyGoogleLanguage(language);
  }, [language, translatorReady]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("site-language", lang);
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      <div id="google_translate_element" className="hidden" />
      <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
