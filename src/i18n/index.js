import i18n from "i18n-js";
import * as Localization from "expo-localization";
import fr from "./fr.json";
import en from "./en.json";

i18n.translations = {
  en: en,
  fr: fr,
};

i18n.locale = Localization.locale;

i18n.fallbacks = true;

export default i18n;
