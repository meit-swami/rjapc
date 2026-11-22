"use client";

import Script from "next/script";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Site language.
 *
 * Page content is written in Hindi; English is produced by the Google Translate
 * website widget. How it works:
 *  - English is the default for visitors who have not picked a language.
 *  - The choice lives in localStorage ("site-language") and in the `googtrans`
 *    cookie, which the widget reads when it starts and then translates the page.
 *  - The widget script is only loaded while English is selected.
 *  - Switching to English never reloads. Switching back to Hindi reloads once,
 *    because only a fresh page restores the original text reliably.
 *  - Nothing ever reloads on its own. (The old code reloaded whenever the widget's
 *    hidden dropdown had not appeared yet, which never happens with the SIMPLE
 *    layout, so English visitors were stuck in a reload loop, worst on mobile.)
 */

type Language = "hi" | "en";

const STORAGE_KEY = "site-language";
const DEFAULT_LANGUAGE: Language = "en";
const GOOGTRANS_EN = "/hi/en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

type TranslateElementCtor = new (options: Record<string, unknown>, elementId: string) => unknown;

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate?: { TranslateElement?: TranslateElementCtor } };
    __rjapcTranslatorDomGuard?: boolean;
  }
}

/**
 * Translators (the widget, or Chrome's own "Translate this page") swap React's text
 * nodes for their own. React then crashes with "removeChild/insertBefore: the node
 * is not a child of this node" on the next update. Ignore those two cases instead
 * of crashing (workaround from facebook/react#11538).
 */
function installTranslatorDomGuard() {
  if (typeof window === "undefined" || typeof Node !== "function") return;
  if (window.__rjapcTranslatorDomGuard) return;
  window.__rjapcTranslatorDomGuard = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(
    this: Node,
    newNode: T,
    referenceNode: Node | null
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

installTranslatorDomGuard();

/** Host-only cookie plus every parent domain (www.rjapc.org → www.rjapc.org, rjapc.org). */
function cookieDomains(): (string | null)[] {
  const host = window.location.hostname;
  const domains: (string | null)[] = [null];
  const isIp = /^[\d.]+$/.test(host) || host.includes(":");
  if (host && host !== "localhost" && !isIp) {
    const parts = host.split(".");
    for (let i = 0; i <= parts.length - 2; i++) domains.push(parts.slice(i).join("."));
  }
  return domains;
}

function clearGoogtrans() {
  for (const d of cookieDomains()) {
    const domain = d ? `; domain=${d}` : "";
    document.cookie = `googtrans=; path=/${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }
}

function setGoogtransEnglish() {
  // Drop stale copies the widget may have written on a parent domain, then set ours.
  clearGoogtrans();
  document.cookie = `googtrans=${GOOGTRANS_EN}; path=/; max-age=31536000; SameSite=Lax`;
}

function readSavedLanguage(): Language | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "en" || v === "hi" ? v : null;
  } catch {
    return null;
  }
}

function saveLanguage(lang: Language) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* private mode etc. — the cookie still carries the choice for this visit */
  }
}

/** If the widget is already on the page, switch it to English without a reload. */
function selectEnglishInWidget(): boolean {
  const combo = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (!combo) return false;
  const idx = Array.from(combo.options).findIndex((o) => o.value === "en");
  if (idx < 0) return false;
  combo.selectedIndex = idx;
  combo.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [resolved, setResolved] = useState(false);
  const languageRef = useRef<Language>(DEFAULT_LANGUAGE);
  const widgetMounted = useRef(false);

  // Resolve the visitor's language once, on the client.
  useEffect(() => {
    const lang = readSavedLanguage() ?? DEFAULT_LANGUAGE;
    languageRef.current = lang;
    if (lang === "en") setGoogtransEnglish();
    else clearGoogtrans();
    setLanguageState(lang);
    setResolved(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Called by Google's script once it has loaded.
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      const TranslateElement = window.google?.translate?.TranslateElement;
      if (widgetMounted.current || !TranslateElement) return;
      widgetMounted.current = true;
      // The widget reads this cookie at start-up; make sure it reflects the current choice.
      if (languageRef.current === "en") setGoogtransEnglish();
      else clearGoogtrans();
      new TranslateElement(
        { pageLanguage: "hi", includedLanguages: "en", autoDisplay: false },
        "google_translate_element"
      );
    };
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    if (lang === languageRef.current) return;
    languageRef.current = lang;
    saveLanguage(lang);

    if (lang === "hi") {
      clearGoogtrans();
      if (widgetMounted.current) {
        // Only a fresh page gives back the original Hindi text reliably.
        window.location.reload();
        return;
      }
      setLanguageState("hi");
      return;
    }

    setGoogtransEnglish();
    setLanguageState("en");
    // Widget already loaded → switch it in place. Otherwise rendering <Script>
    // below loads it and it translates from the cookie on start-up.
    selectEnglishInWidget();
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);
  const loadWidget = resolved && language === "en";

  return (
    <LanguageContext.Provider value={value}>
      <div id="google_translate_element" className="notranslate" translate="no" />
      {loadWidget && (
        <Script
          id="google-translate-widget"
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      )}
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
