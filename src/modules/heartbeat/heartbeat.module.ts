import { Module } from '@nestjs/common';
import { HeartbeatController } from './heartbeat.controller';

@Module({
    imports: [],
    controllers: [HeartbeatController]
})
export class HeartbeatModule {}
