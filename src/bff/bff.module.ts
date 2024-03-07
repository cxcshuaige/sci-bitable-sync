import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { BFFController } from './bff.controller';
import MockMiddleware from '@/common/middlewares/mock.middleware';

@Module({
    controllers: [BFFController],
})
export class BFFModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MockMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
        
    }
}
