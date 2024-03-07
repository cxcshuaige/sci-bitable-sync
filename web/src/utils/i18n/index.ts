interface IConfigI18n{
    locales: {
        [prop:string]: any;
    };
    def: string;
}

class I18n {
    static instance: I18n | null;
    static getInstance() {
        if (!I18n.instance) {
            I18n.instance = new I18n()
        }
        return I18n.instance;
    }
    private locales;
    private def;
    private nowLocaleStr;
    constructor(){
        this.locales = null;    // 所有语言源数据
        this.def = null;    // 默认指定语言源key
        this.nowLocaleStr = null; // 当前指定语言源key
    }
    // 初始化配置
    config(opts: IConfigI18n){
        this.locales = opts.locales;
        this.def = opts.def;
    }

    // 切换语言源
    switch(localeStr?: string){
        if (localeStr) {
            this.nowLocaleStr = localeStr;
            return;
        }
        this.nowLocaleStr = this.def;
    }

    // 获取当前语言源数据
    getLocale(){
        return this.locales[this.nowLocaleStr || this.def];
    }

    // 翻译
    $t(key: string, obj?: object, def?: string){
        if (!key) {
            return 'now locale key';
        }
        const locale = this.locales[this.nowLocaleStr || this.def];
        let temp;
        if (locale[key]) {
            temp = locale[key];
        } else {
            temp = def;
        }
        if (temp) {
            if (obj) {
                Object.keys(obj).forEach((o) => {
                    const reg = new RegExp(`{\\s*${o}\\s*}`, "gm");
                    temp = temp.replace(reg, ($1, $2) => {
                        return obj[o];
                    });
                })
                return temp;
            }
            return temp;
        }
        return key;
    }
}

export const i18nInstance = I18n.getInstance();

export default I18n;