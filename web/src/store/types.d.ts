import type { IMenu, IMenuItem } from "@/layouts/menu/types";
import type { IDrawerState } from "@/components/drawer/types";
import type { IModalState } from "@/components/modal/types";

export interface IUser {
    userName: string;
    uid: string;
    nickname: string;
    avatar: string;
}

export type TCtxEnv = "local" | "prod" | "test";
export type TLocale = "zh" | "en";
export interface IGlobalState {
    user?: IUser;
    ctxEnv?: TCtxEnv;
    locale?: TLocale;
    menu?: IMenu[];
    focusPathName?: string;
    focusMenu?: IMenuItem;
    menuBread?: IMenu[];
}

