import { Module } from '@nestjs/common';
import { HeartbeatModule } from './heartbeat/heartbeat.module';
import { MetaModule } from './meta/meta.module';
import { ApiModule } from './api/api.module';
@Module({
    imports: [
        HeartbeatModule,
        MetaModule,
        ApiModule
    ]
})
export default class Modules {}
