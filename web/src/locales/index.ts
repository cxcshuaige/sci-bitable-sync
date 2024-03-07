import { i18nInstance } from "@ecoding/helper.i18n";
import { getCookie } from "@ecoding/helper.cookie";
import localStorage from "@ecoding/helper.storage.local";
import { getParamFromUrl } from "@ecoding/helper.url";
import { LocaleKey } from "@/constants/project";
// antd locale
import antdzh_CN from "antd/lib/locale/zh_CN";
import antden_US from "antd/lib/locale/en_US";

// project locale
import zh_CN from "./zh_CN";
import en_US from "./en_US";

const getLocales = (locale) => {
    const map = {
        zh: Object.assign(antdzh_CN, zh_CN),
        en: Object.assign(antden_US, en_US)
    };
    if (locale === "all") {
        return map;
    }
    return map[locale];
};

const i18n = i18nInstance.config({
    locales: getLocales("all"),
    def: "en"
});

export const localLocale = getParamFromUrl(LocaleKey) || getCookie(LocaleKey) || localStorage.getStore(LocaleKey) || "en"
if (localLocale) {
    i18n.switch(localLocale);
}


export default i18n;
