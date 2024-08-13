import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to the English site!",
    }
  },
  br: {
    translation: {
      welcome: "Bem-vindo ao site brasileiro!",
    }
  },
  cn: {
    translation: {
      welcome: "欢迎来到中国网站！",
    }
  }
};

i18n
.use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // Disable browser language detection
      order: [],
    },
  });


export default i18n;
