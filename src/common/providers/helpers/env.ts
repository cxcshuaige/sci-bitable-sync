import { EnvEnum } from '../../constants/config.enum';
export const ctxEnv = EnvEnum[process.env.NODE_ENV] || "prod";
export const isProd = ctxEnv === "prod";
export const isLocal = ctxEnv === "local";