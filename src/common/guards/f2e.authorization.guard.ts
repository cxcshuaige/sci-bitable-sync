import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
// import UserDao from "@/orm/dao/anonymous/topic.dao";
import type { Response, Request } from "express";

@Injectable()
export class F2eAuthorizationGuard implements CanActivate{
    constructor(
        // private readonly userDao: UserDao
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 1. 获取上下文
        const ctx = context.switchToHttp();
        // 2. 获取 req res
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        const f2eauthorization = req.headers.f2eauthorization;
        if (f2eauthorization === "il8W89iDC6AluboIYw6aybsUaZcx3dXt") {
            return true;
        }
        // 3. 获取请求体中的用户信息进行鉴权
        // const user = await this.userDao.findOneById(req.user.id)
        // console.log(user)
        return false;
    }
}