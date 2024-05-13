import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import BrowserLanguageDetector from 'i18next-browser-languagedetector';
import {enTranslations} from '../locales/en';

const resources = {
  en: {
    translation: enTranslations,
  },
};

i18n
  .use(initReactI18next)
  .use(BrowserLanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
    },
  });
