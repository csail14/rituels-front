import i18n from "i18n-js";
import * as Localization from "expo-localization";
import fr from "./fr.json";
import en from "./en.json";
import es from "./es.json";

export const buildI18n = (user = null) => {
  const lang =
    user &&
    user.subuser &&
    user.subuser[user.current_subuser] &&
    user.subuser[user.current_subuser].lang;
  i18n.translations = {
    en: en,
    fr: fr,
    es: es,
  };

  i18n.locale = lang ? lang : Localization.locale;
  i18n.fallbacks = true;
  return i18n;
};
