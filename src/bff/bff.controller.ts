import { Controller, Get, Res, Req, Logger } from '@nestjs/common';
import { resolve } from 'path';
import { readFileSync } from 'fs-extra';
import { Response, Request } from 'express';
import { Helpers } from '@/common/providers/helpers';
import { EnvEnum } from '@/common/constants';

@Controller('*')
export class BFFController {
    constructor(
        private readonly helper: Helpers,
        private readonly logger: Logger
    ) {}
    @Get()
    async entry(@Req() req: Request, @Res() res: Response) {
        let html = '';
        const env = this.helper.ctxEnv;
        switch (env) {
            case EnvEnum.local: {
                const abc = require(this.helper.dir.rootPath('./web', 'abc.js'));
                const port = abc.dev.port;
                const res = await this.helper.r.get(`http://127.0.0.1:${port}`, {}, { responseType: "text" });
                html = res;
                break;
            }
            default: {
                const htmlFile = resolve(__dirname, '../public', 'dist', 'index.html');
                html = readFileSync(htmlFile, 'utf-8');
                break;
            }
        }
        
        html = html.replace(
            '<!--__HTML_SSR_SCRIPT__-->',
            this.helper.tpl.getScript({
                ctxEnv: env,
                // nacos: global.nacos,
            })
        );
        res.send(html);
    }
}
