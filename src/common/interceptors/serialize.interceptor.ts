import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";

@Injectable()
export default class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data) => {
                return plainToInstance(this.dto, data, {
                    // 设置为true后，所有经过该拦截器的接口都需要设置expose或exclude
                    excludeExtraneousValues: true
                })
            })
        )
    }
}
