import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from "express";

@Controller()
export class MetaController {
    @Get('meta.json')
    status(@Res() res: Response) {
        res.send({
            schemaVersion: 1,
            version: '1.0.0',
            type: 'data_connector',
            extraData: {
                disabledPeriodicSync: false,
                dataSourceConfigUiUri: 'https://sync.sciecomm.cn', // 连接器插件 UI 界面的访问地址
                // dataSourceConfigUiUri: 'https://1c57-60-12-241-126.ngrok-free.app', // 连接器插件 UI 界面的访问地址
                initHeight: 330, // 初始化的配置窗口内容高度，最小226，最大606
                initWidth: 620 // 初始化的配置窗口内容宽度，最小420，最大840
            },
            protocol: {
                type: 'http',
                httpProtocol: {
                    uris: [
                        {
                            type: 'tableMeta',
                            uri: '/sync/table_meta'
                        },
                        {
                            type: 'records',
                            uri: '/sync/records'
                        }
                    ]
                }
            }
        });
    }
}
