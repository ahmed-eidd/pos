import React, { createContext, useEffect, useState } from 'react';

export const CurrentLangContext = createContext();

export const CurrentLangProvider = ({ children }) => {
  const [lang, setLang] = useState('ar');
  useEffect(() => {
    if (localStorage.getItem('lang') === null) {
      localStorage.setItem('lang', lang);
      document.getElementsByTagName('html')[0].setAttribute('lang', lang);
    } else {
      document.getElementsByTagName('html')[0].setAttribute('lang', lang);
    }
  }, [lang]);
  return (
    <CurrentLangContext.Provider value={[lang, setLang]}>
      {children}
    </CurrentLangContext.Provider>
  );
};
