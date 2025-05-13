// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import translationEN from './locales/en/translation.json';
// import translationRO from './locales/ro/translation.json';

// const resources = {
//     en: { translation: translationEN },
//     ro: { translation: translationRO }
// };

// i18n.use(initReactI18next).init({
//     resources,
//     lng: 'ro', // sau 'en', default
//     fallbackLng: 'en',
//     interpolation: { escapeValue: false }
// });

// export default i18n;

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import translationEN from './locales/en/translation.json';
import translationRO from './locales/ro/translation.json';
console.log("i18n current language:", i18n.language);

const resources = {
    en: { translation: translationEN },
    ro: { translation: translationRO },
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: localStorage.getItem('selectedLanguage') || 'ro', // Limba salvată în localStorage sau 'ro' ca implicită
        fallbackLng: 'ro',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        returnObjects: true, // Activează returnarea obiectelor
    });

export default i18n;