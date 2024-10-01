
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import languagedetector from 'i18next-browser-languagedetector';
import translationEN from './locale/en.json';
import translationFr from './locale/fr.json';
import { getLanguage } from './utils/language';

const resources = {
    en: {
      translation:translationEN
    },
    fr: {
      translation:translationFr
    }
  };
  
i18n
// .use(languagedetector)
  .use(initReactI18next) 
  .init({
    resources,
    lng: getLanguage(), 
    fallbackLng: "fr",

    interpolation: {
      escapeValue: false,
    },
    react:{

    }
  },() => {
    console.log('i18next is ready');
    
  });

export default i18n;