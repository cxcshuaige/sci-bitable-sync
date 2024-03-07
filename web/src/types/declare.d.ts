declare module "*.css";
declare module "*.less";
declare module "*.png";
declare module "*.jpg";
declare module "*.svg";
declare namespace process {
    var env: any;
}

declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
    __POWERED_BY_QIANKUN__: any;
    __PRELOAD_STATE__: any;
    isSSR: boolean;
    [propsName: string]: any;
}

declare module "@ecoding/detect" {
    function getSecurity(): Promise<any>;
    function getDeviceUdid(): Promise<string>;
    function getDeviceId(): Promise<string>;
}

declare module "@ecoding/lib/tools/version" {
    interface IVersion {
        gte: (str: string) => string;
    }
    function version(version: string | Number): IVersion;
    export = version;
}

declare module "@ecoding/core.util/lib/tools/cookie" {
    function cookie(key: string, value?: string): void | string;
    export = cookie;
}

declare module "@ecoding/core.share/lib" {
    interface IGetShare {
        setShareData(): void;
    }
    function getShare(): IGetShare;
    export = getShare;
}

declare module "@ecoding/callapp" {
    interface Iprams {
        callAppCb: (opened: boolean | number) => void; // opened:1 唤起成功，0 唤起失败
        watchWordOptions: {
            businessName: string;
            customContent: {};
        };
    }
    class callApp {
        download(obj: Iprams): void;
    }
    export = callApp;
}

declare module "toast" {
    interface IToast {
        show: (str: string) => void;
    }
    var Toast: IToast;
    export = Toast;
}
