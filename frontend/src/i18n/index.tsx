import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import fr from './fr.json';
import en from './en.json';

type Translations = typeof fr;
type Lang = 'fr' | 'en';

interface I18nContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

const translations: Record<Lang, Translations> = { fr, en };

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('ba-lang');
    return (saved === 'en' ? 'en' : 'fr') as Lang;
  });

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('ba-lang', newLang);
    document.documentElement.lang = newLang;
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'fr' ? 'en' : 'fr');
  }, [lang, setLang]);

  return (
    <I18nContext.Provider value={{ lang, t: translations[lang], toggleLang, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
