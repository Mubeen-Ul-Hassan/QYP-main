// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import swedish from "./swedish";
import finnish from "./finnish";
import english from "./eng"; // Import English translations

i18n.use(initReactI18next).init({
  resources: {
    fi: { translation: finnish },
    sv: { translation: swedish },
    en: { translation: english }, // Add English translations
  },
  lng: "fi", // Set default language to Finnish
  fallbackLng: "fi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
