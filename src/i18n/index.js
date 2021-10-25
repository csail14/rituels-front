import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import locale from "react-native-locale-detector";
import AsyncStorage from "@react-native-async-storage/async-storage";

import fr from "./fr.json";
import en from "./en.json";

const Language_KEY = "@APP:languageCode";

const languageDetector = {
  init: Function.prototype,
  type: "languageDetector",
  async: true, // flags below detection to be async
  detect: async (callback) => {
    const savedDataJSON = await AsyncStorage.getItem(Language_KEY);
    const lng = savedDataJSON ? savedDataJSON : null;
    const selectLanguage = lng || locale;
    console.log("detect - selectLanguage:", selectLanguage);
    callback(selectLanguage);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: "fr",
    resources: { fr, en },

    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common",

    debug: true,

    //   cache: {
    //  enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
