import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfiguration } from './configuration';
import { ShareModuleProviders } from './common/providers';
import Modules from './modules';
import { BFFModule } from './bff/bff.module';
@Module({
    // 先加入的优先级越高
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // 开启全局依赖注入
            load: [appConfiguration]
        }),
        ShareModuleProviders,
        Modules,
        BFFModule
    ]
    // app配置controller时，优先级最高
})
export class AppModule {}
