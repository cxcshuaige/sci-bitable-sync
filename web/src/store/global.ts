import { makeObservable, observable, action } from 'mobx';
import type { IGlobalState, TCtxEnv, TLocale } from "./types";
import type { IMenu, IMenuItem } from "@/layouts/menu/types";

class GlobalStore {
    @observable ctxEnv: TCtxEnv | undefined;
    @observable menu: IMenu[] | undefined;
    @observable user: IGlobalState["user"];
    @observable locale?: TLocale;
    @observable focusPathName?: string;
    @observable focusMenu?: IMenuItem;
    @observable menuBread?: IMenu[];

    constructor(){
        makeObservable(this);
    }

    @action init(initialState: IGlobalState){
        this.menu = initialState.menu;
        this.ctxEnv = initialState.ctxEnv;
        this.user = initialState.user;
    }

} 


export default new GlobalStore();