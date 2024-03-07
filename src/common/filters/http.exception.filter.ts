import {
    Catch,
    HttpException,
    BadRequestException,
    ExceptionFilter,
    ArgumentsHost,
    LoggerService
} from '@nestjs/common';
import * as requestIP from 'request-ip';
import { fail } from "../tools/resp";
// 如果 @Catch 不传入 exception类型，则捕获所有
/**
● HttpException
● BadRequestException
● UnauthorizedException
● NotFoundException
● ForbiddenException
● NotAcceptableException
● RequestTimeoutException
● ConflictException
● GoneException
● PayloadTooLargeException
● UnsupportedMediaTypeException
● UnprocessableException
● InternalServerErrorException
● NotImplementedException
● BadGatewayException
● ServiceUnavailableException
● GatewayTimeoutException
*/

@Catch(HttpException)
export default class HttpExceptionFilter implements ExceptionFilter {
    constructor(private readonly logger: LoggerService) {}
    catch(exception: HttpException, host: ArgumentsHost) {
        console.log("exception", exception.getResponse())
        const ctx = host.switchToHttp(); // 获取express 上下文
        const res = ctx.getResponse(); // express response
        const req = ctx.getRequest(); // express request
        const ip = requestIP.getClientIp(req);
        let msg = exception.message || exception.name || `Internal Server Error-${exception}`;
        if (exception instanceof BadRequestException) {
            const exceptionRes = exception.getResponse() as any;
            msg = exceptionRes.message || exception.message || exception.name || `Internal Server Error-${exception}`;
        }
        const status = exception.getStatus && exception.getStatus(); // http 状态码
        this.logger.error(`${ip}-${msg}`, exception.stack);
        res.status(status).json(fail({
            code: 500,
            message: msg
        }));
    }
}
