import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from "express";
import { success } from "../tools/resp";
import { getHttpException } from "../tools/error.factory";


@Injectable()
export default class SucInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        return next.handle().pipe(
            map(data => {
                const response = context.switchToHttp().getResponse() as Response;
                const ct = response.getHeader("content-type") as string || "";
                if (
                    ct.indexOf("text/event-stream") != -1 || 
                    ct.indexOf("application/octet-stream") != -1
                ) {
                    return data;
                }
                if (response.headersSent) { // 表示直接走express res.send
                    return data;
                }
                if (typeof data === 'undefined') {
                    throw getHttpException('返回值为 undefined 或 null ！', 400)
                }
                return success({ data });
            })
        );
    }
}
