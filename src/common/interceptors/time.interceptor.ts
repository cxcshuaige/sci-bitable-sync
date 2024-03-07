import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export default class TimeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                const time = `1After... ${Date.now() - now}ms`;
                console.log(time);
            })
        );
    }
}
