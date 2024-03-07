import { Catch, ExceptionFilter, ArgumentsHost, LoggerService } from "@nestjs/common";
import { QueryFailedError, TypeORMError } from "typeorm";
import * as requestIP from "request-ip";
import { fail } from "../tools/resp";
// 如果 @Catch 不传入 exception类型，则捕获所有

@Catch(TypeORMError)
export default class OrmExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly logger: LoggerService
    ){}
    catch(exception: TypeORMError, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // 获取express 上下文
        const res = ctx.getResponse(); // express response
        const req = ctx.getRequest(); // express request
        const ip = requestIP.getClientIp(req);
        const msg = exception.message || exception.name || `Internal Server Error-${exception}`;
        let status = 500;
        let code = 500;
        // 抛出数据库官方错误码
        if (exception instanceof QueryFailedError) {
            code = exception.driverError.errno;
        }
        this.logger.error(`${ip}-${code}-${msg}`, exception.stack);
        res.status(status).json(fail({
            code: status,
            message: msg
        }))
    }
}