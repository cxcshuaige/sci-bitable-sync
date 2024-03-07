import { i18nInstance } from "@ecoding/helper.i18n";
// antd locale
// project locale
import zh_CN from "./zh_CN";
import en_US from "./en_US";

const getLocales = (locale) => {
    const map = {
        zh: zh_CN,
        en: en_US
    };
    if (locale === "all") {
        return map;
    }
    return map[locale];
};

const i18n = i18nInstance.config({
    locales: getLocales("all"),
    def: "zh"
});

export default i18n;
