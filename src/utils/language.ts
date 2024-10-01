import { i18n } from "i18next";

export const getLanguage = (): string => {
    return localStorage.getItem('language') ?? 'fr';
}

export const setLanguage = (instance: i18n, language: 'en' | 'fr') => {
   instance.changeLanguage(language)
   localStorage.setItem('language', language)
}