import { merge } from 'lodash';
import { homedir } from "os";
import { join } from "path";
// ---
import { createLogger } from 'winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { WinstonModule, utilities } from 'nest-winston';
// ---
import { ctxEnv, isLocal } from './common/providers/helpers/env';
import { CorsWhite } from './common/constants';

import type { Request } from 'express';
import type { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// 根据环境获取到配置信息
let config;
const getEnvConfiguration = () => {
    if (config) {
        return config;
    }
    const defaultConfig = require('./config/default').default();
    const envConfig = require(`./config/${ctxEnv}`).default();
    config = merge(defaultConfig, envConfig);
    return config;
};


// 应用全局配置信息
export const appConfiguration = async () => {
    const config = getEnvConfiguration();
    // todo 异步处理敏感信息，比如数据库账号密码,OSS key
    return config;
};

// 跨域配置
export const corsOptionsDelegate = (req: Request, callback) => {
    // console.log("req.header('Origin')",req.header('Origin'))
    let corsOptions: CorsOptions = {
        // 设置 Access-Control-Allow-Headers 的值，【默认值】会获取请求头上的 Access-Control-Request-Headers
        allowedHeaders: ["x-requested-with", "accesstoken", "language", "content-type", "f2eauthorization", "authorization"],
        // 设置 Access-Control-Expose-Headers 的值，暴露给前端的header
        exposedHeaders: ["x-requested-with", "accesstoken", "language", "content-type", "f2eauthorization", "authorization"],
        // 设置 Access-Control-Max-Age 缓存了 options 请求
        maxAge: 86400,
        // 设置 Access-Control-Allow-Credentials 允许携带cookie
        // credentials: true,
    };
    const origin = req.header('Origin');
    if (CorsWhite === '*') {
        corsOptions.origin = origin;
        corsOptions.credentials = true;
        callback(null, corsOptions);
    } else {
        if (Array.isArray(CorsWhite) && (CorsWhite as any).indexOf(origin) !== -1) {
            corsOptions.origin = origin;
            corsOptions.credentials = true;
        } else {
            corsOptions = { origin: false }; // disable CORS for this request
        }
        callback(null, corsOptions); // callback expects two parameters: error and options
    }
};

// 配置日志基于第三方winston
let winstonLoggerService;
export const getWinstonLoggerService = () => {
    if (winstonLoggerService) {
        return winstonLoggerService;
    }
    const config = getEnvConfiguration();
    const dirname = isLocal ? 'logs' : join(homedir(), 'logs', config.appName || "nestjs");
    winstonLoggerService = WinstonModule.createLogger({
        instance: createLogger({
            transports: [
                // 配置终端打印
                new winston.transports.Console({
                    level: 'info',
                    format: winston.format.combine(winston.format.timestamp(), utilities.format.nestLike())
                }),
                // true 打开日志 false 关闭日志
                ...(config.isLog
                    ? [
                        // 配置记录到滚动文件
                        new DailyRotateFile({
                            level: 'warn', // 只记录警告日志
                            dirname, // 记录到文件夹
                            filename: 'warn-error-%DATE%.log', // 文件名
                            datePattern: 'YYYY-MM-DD-HH', // 文件日期的格式
                            zippedArchive: true, // 开启压缩
                            maxSize: '20m', // 一个文件最大 20m
                            maxFiles: '14d', // 14天后删除
                            format: winston.format.combine(
                                winston.format.timestamp({
                                    format: 'YYYY-MM-DD HH:mm:ss'
                                }),
                                winston.format.simple()
                            )
                        }),
                        new DailyRotateFile({
                            level: 'info', // 记录所有
                            dirname, // 记录到文件夹
                            filename: 'info-%DATE%.log', // 文件名
                            datePattern: 'YYYY-MM-DD-HH', // 文件日期的格式
                            zippedArchive: true, // 开启压缩
                            maxSize: '20m', // 一个文件最大 20m
                            maxFiles: '14d', // 14天后删除
                            format: winston.format.combine(
                                winston.format.timestamp({
                                    format: 'YYYY-MM-DD HH:mm:ss'
                                }),
                                winston.format.simple()
                            )
                        })
                    ]: [])
            ]
        })
    });
    return winstonLoggerService;
};

