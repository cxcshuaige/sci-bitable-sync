import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter, OrmExceptionFilter } from "./common/filters";
import { SucInterceptor } from "./common/interceptors";
import { corsOptionsDelegate, getWinstonLoggerService } from './configuration';
import { AppModule } from './app.module';

async function bootstrap() {
    // 基于express
    const winstonLoggerService = getWinstonLoggerService();
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        // 配置日志基于第三方winston
        logger: winstonLoggerService
    });

    // 配置cookie获取
    app.use(cookieParser());

    // 开启gzip
    app.use(compression());

    // 设置静态资源目录
    app.useStaticAssets(join(__dirname, './public'), {
        prefix: '/public'
    });
    
    // 设置跨域
    app.enableCors(corsOptionsDelegate);

    // 设置全局拦截器
    app.useGlobalInterceptors(
        new SucInterceptor()
    )

    // 设置全局异常过滤器
    app.useGlobalFilters(
        new HttpExceptionFilter(winstonLoggerService),
        new OrmExceptionFilter(winstonLoggerService)
    );

    await app.listen(7007);

}
bootstrap();
