import { useCurrentLang } from './useCurrentLang';

export const useDisplayText = (key) => {
  const [currentLang] = useCurrentLang();
  return key[currentLang];
};
