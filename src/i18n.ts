import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        resources: {
            en: {
                translation: {
                    'tasks' : 'Tasks',
                },
            },
            ja: {
                translation: {
                    'tasks' : 'タスク',
                },
            },
        },
    });

export default i18n;