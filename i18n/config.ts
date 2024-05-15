import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '@/translations/en-EN';
import frTranslations from '@/translations/fr-FR';
import Config from '@/config';

const lng =
  localStorage.getItem('i18nextLng') || Config.languageConfig.defaultLanguage;

i18next.use(initReactI18next).init({
  lng,
  debug: true,
  fallbackLng: 'en',
  resources: {
    en: {
      translation: enTranslations,
    },
    fr: {
      translation: frTranslations,
    },
  },
  react: {
    useSuspense: false,
  },
});

export default i18next;
