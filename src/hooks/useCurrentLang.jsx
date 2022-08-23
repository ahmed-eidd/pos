import { useContext } from 'react';
import { CurrentLangContext } from '../context/currentLang';

export const useCurrentLang = () => {
  const [currentLang, setCurrentLang] = useContext(CurrentLangContext);
  return [currentLang, setCurrentLang];
};
