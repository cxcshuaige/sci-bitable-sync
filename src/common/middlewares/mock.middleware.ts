import { Injectable, NestMiddleware } from "@nestjs/common"
import { ConfigService } from "@nestjs/config";
import { Request, Response, NextFunction } from 'express';
import { Helpers } from "@/common/providers/helpers";
import { EnvEnum } from "@/common/constants";

@Injectable()
export default class MockMiddleware implements NestMiddleware{
    constructor(
        private readonly configService:ConfigService,
        private readonly helpers:Helpers,
    ){}
    async use(req: Request, res: Response, next: NextFunction) {
        const ctxEnv = this.helpers.ctxEnv;
        if (ctxEnv !== EnvEnum.local) {
            return await next();
        }
        const mock = this.configService.get("mock");
        const path = req.path.replace(/^\/(gw|proxy)/, "");
        const matchPath = path.match(/(^\/.*?)\//);
        const prefixPath = matchPath && matchPath[1];
        
        if (/\.js\.map$/.test(path)) {
            return res.send();
        }

        if (!Array.isArray(mock) || mock.length === 0 || !mock.includes(prefixPath)) {
            return await next();
        }
        
        const method = req.method.toLowerCase();
        const abc = require(this.helpers.dir.rootPath("./web", "abc.js"));
        const port = abc.dev.port;
        let promise;
        switch (method) {
            case "get": {
                promise = () => this.helpers.r.get(`http://localhost:${port}${path}`, req.query, { skip: true });
                break;
            }
            case "put": {
                promise = () => this.helpers.r.put(`http://localhost:${port}${path}`, req.body, { skip: true });
                break;
            }
            default: {
                promise = () => this.helpers.r.post(`http://localhost:${port}${path}`, req.body, { skip: true });
                break;
            }
        }
        try{
            const mockData = await promise();
            if (mockData) {
                res.send(mockData);
            } else {
                await next();
            }
        } catch(e){
            await next();
        }
    }
}

