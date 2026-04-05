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
        TranslateElementInlineLayout?: { SIMPLE: number };
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

function selectOriginalLanguage(combo: HTMLSelectElement): boolean {
  const opts = Array.from(combo.options);
  const emptyIdx = opts.findIndex((o) => o.value === "");
  if (emptyIdx >= 0) {
    combo.selectedIndex = emptyIdx;
    fireComboChange(combo);
    return true;
  }
  if (opts.length > 0) {
    combo.selectedIndex = 0;
    fireComboChange(combo);
    return true;
  }
  return false;
}

function selectEnglishTranslation(combo: HTMLSelectElement): boolean {
  const candidates = ["en", "en|hi", "hi|en", "/en/en", "/hi/en"];
  for (const v of candidates) {
    const idx = Array.from(combo.options).findIndex((o) => o.value === v);
    if (idx >= 0) {
      combo.selectedIndex = idx;
      fireComboChange(combo);
      return true;
    }
  }
  for (let i = 0; i < combo.options.length; i++) {
    const o = combo.options[i];
    const t = (o.textContent || "").toLowerCase();
    if (t.includes("english") && o.value !== "") {
      combo.selectedIndex = i;
      fireComboChange(combo);
      return true;
    }
  }
  return false;
}

function tryApplyViaCombo(lang: Language): boolean {
  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (!combo || combo.options.length === 0) return false;
  if (lang === "hi") {
    return selectOriginalLanguage(combo);
  }
  return selectEnglishTranslation(combo);
}

function applyGoogleLanguage(lang: Language, allowReload: boolean) {
  if (typeof window === "undefined") return;

  if (lang === "hi") {
    clearGoogtransCookies();
  } else {
    setGoogtransCookies("/hi/en");
  }

  let tries = 0;
  const maxTries = 8;
  const run = () => {
    if (tryApplyViaCombo(lang)) return;
    tries += 1;
    if (tries >= maxTries) {
      if (allowReload) window.location.reload();
      return;
    }
    window.setTimeout(run, 100 * tries);
  };
  run();
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
  const languageChangeFromUser = useRef(false);
  const bootstrapEnglishDone = useRef(false);

  useEffect(() => {
    const saved = getSavedLanguage();
    setLanguageState(saved);
    if (saved === "en") setGoogtransCookies("/hi/en");
    else clearGoogtransCookies();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "hi";
  }, [language]);

  useLayoutEffect(() => {
    window.googleTranslateElementInit = () => {
      if (translateMounted.current) return;
      if (!window.google?.translate?.TranslateElement) return;
      translateMounted.current = true;

      const TE = window.google.translate.TranslateElement as unknown as {
        new (options: Record<string, unknown>, elementId: string): unknown;
        InlineLayout?: { SIMPLE: number };
      };

      const layout = TE.InlineLayout?.SIMPLE;

      new TE(
        {
          pageLanguage: "hi",
          includedLanguages: "en",
          autoDisplay: false,
          ...(layout !== undefined ? { layout } : {}),
        },
        "google_translate_element"
      );
      setTranslatorReady(true);
    };
  }, []);

  useEffect(() => {
    if (!translatorReady) return;
    const userClicked = languageChangeFromUser.current;
    languageChangeFromUser.current = false;

    const firstTimeEnglish = language === "en" && !bootstrapEnglishDone.current;
    if (language === "en") bootstrapEnglishDone.current = true;

    applyGoogleLanguage(language, userClicked || firstTimeEnglish);
  }, [language, translatorReady]);

  const setLanguage = useCallback((lang: Language) => {
    languageChangeFromUser.current = true;
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("site-language", lang);
      if (lang === "en") setGoogtransCookies("/hi/en");
      else clearGoogtransCookies();
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
      <div id="google_translate_element" />
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
