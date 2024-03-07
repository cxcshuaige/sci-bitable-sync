import { Controller, Get } from '@nestjs/common';

@Controller('status')
export class HeartbeatController {
    @Get()
    status() {
        return "ok"
    }
}