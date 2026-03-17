import { useState, useEffect } from 'react';

export type Lang = 'en' | 'ar';

export const useLanguage = () => {
  const [lang, setLang] = useState<Lang>('ar');

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
  }, []);

  const switchLang = (newLang: Lang) => {
    setLang(newLang);
    const html = document.documentElement;
    if (newLang === 'ar') {
      html.dir = 'rtl';
      html.lang = 'ar';
    } else {
      html.dir = 'ltr';
      html.lang = 'en';
    }
  };

  return { lang, switchLang, isAr: lang === 'ar' };
};
