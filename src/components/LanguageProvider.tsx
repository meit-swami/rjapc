"use client";

import Script from "next/script";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
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

const GOOGTRANS_EXPIRED = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

function clearGoogtransCookies() {
  document.cookie = `googtrans=; path=/; ${GOOGTRANS_EXPIRED}`;
  const host = window.location.hostname;
  if (host && host !== "localhost" && host !== "127.0.0.1") {
    document.cookie = `googtrans=; domain=${host}; path=/; ${GOOGTRANS_EXPIRED}`;
  }
}

function setGoogtransCookies(fromTo: string) {
  document.cookie = `googtrans=${fromTo}; path=/`;
  const host = window.location.hostname;
  if (host && host !== "localhost" && host !== "127.0.0.1") {
    document.cookie = `googtrans=${fromTo}; domain=${host}; path=/`;
  }
}

function fireComboChange(combo: HTMLSelectElement) {
  combo.dispatchEvent(new Event("change", { bubbles: true }));
  combo.dispatchEvent(new InputEvent("input", { bubbles: true }));
}

function tryApplyViaCombo(lang: Language): boolean {
  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (!combo) return false;
  if (lang === "hi") {
    combo.value = "";
    if (combo.value !== "") {
      const opt = combo.querySelector('option[value=""]');
      if (opt) combo.selectedIndex = Array.from(combo.options).indexOf(opt as HTMLOptionElement);
    }
  } else {
    combo.value = "en";
  }
  fireComboChange(combo);
  return true;
}

function applyGoogleLanguage(lang: Language, allowReload: boolean) {
  if (typeof window === "undefined") return;

  if (lang === "hi") {
    clearGoogtransCookies();
  } else {
    setGoogtransCookies("/hi/en");
  }

  const attempt = () => tryApplyViaCombo(lang);

  if (attempt()) return;

  requestAnimationFrame(() => {
    if (attempt()) return;
    window.setTimeout(() => {
      if (attempt()) return;
      if (allowReload) window.location.reload();
    }, 150);
  });
}

function getSavedLanguage(): Language {
  if (typeof window === "undefined") return "hi";
  const stored = window.localStorage.getItem("site-language");
  return stored === "en" ? "en" : "hi";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("hi");
  const [translatorReady, setTranslatorReady] = useState(false);
  const translateMounted = useRef(false);
  /** True when the next apply is from clicking the header toggle (may hard-reload if the widget combo is missing). */
  const languageChangeFromUser = useRef(false);

  useEffect(() => {
    const saved = getSavedLanguage();
    setLanguageState(saved);
  }, []);

  useLayoutEffect(() => {
    window.googleTranslateElementInit = () => {
      if (translateMounted.current) return;
      if (!window.google?.translate?.TranslateElement) return;
      translateMounted.current = true;
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
    const allowReload = languageChangeFromUser.current;
    languageChangeFromUser.current = false;
    applyGoogleLanguage(language, allowReload);
  }, [language, translatorReady]);

  const setLanguage = useCallback((lang: Language) => {
    languageChangeFromUser.current = true;
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
