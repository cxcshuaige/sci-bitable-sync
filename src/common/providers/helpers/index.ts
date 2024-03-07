import { Injectable } from '@nestjs/common';
import Dir from './dir';
import Tpl from './tpl';
import getHttp from './http';
import i18n from './locales';
import { ctxEnv, isProd, isLocal } from "./env";
import { fireError, getError } from "./error";

@Injectable()
export class Helpers {
    dir = new Dir();
    tpl = new Tpl();
    ctxEnv = ctxEnv;
    isProd = isProd;
    isLocal = isLocal;
    i18n = i18n;
    fireError = fireError;
    getError = getError;
    r = getHttp(this.ctxEnv);
}
