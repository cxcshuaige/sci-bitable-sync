import { Controller, Post, Get, Res, HttpCode, Body, Query } from '@nestjs/common';
import type { Response } from "express";
import { Helpers } from '@/common/providers/helpers';
import { CacheDto, CacheGetDto } from "./api.dto";

const domain = "https://pgsync-plugin.sciecomm.cn";

@Controller("sync")
export class ApiController {
    constructor(
        private readonly helpers: Helpers
    ) {}

    @Post('table_meta')
    @HttpCode(200)
    async tableMeta(@Res() res: Response, @Body() dto) {
        const params = JSON.parse(dto.params);
        const context = JSON.parse(dto.context);
        const datasourceConfig = JSON.parse(params.datasourceConfig);
        params.datasourceConfig = datasourceConfig;
        const result = await this.helpers.r.post(`${domain}/lark/table/meta`, {
            params,
            context
        });
        res.send(result);
    }


    @Post('records')
    @HttpCode(200)
    async record(@Res() res: Response, @Body() dto) {
        const params = JSON.parse(dto.params);
        const context = JSON.parse(dto.context);
        const datasourceConfig = JSON.parse(params.datasourceConfig);
        params.datasourceConfig = datasourceConfig;
        const result = await this.helpers.r.post(`${domain}/lark/table/records`, {
            params,
            context
        });
        res.send(result);
    }

    @Post('cache')
    @HttpCode(200)
    async cache(@Body() dto: CacheDto) {
        const userId = dto.userId;
        const data = dto.data;
        await this.helpers.r.post(`${domain}/lark/table/cache/config`, {
            key: userId,
            value: data
        });
        return "ok"
    }

    @Get('cache_get')
    @HttpCode(200)
    async cacheGet(@Query() dto: CacheGetDto) {
        const userId = dto.userId;
        const data = await this.helpers.r.get(`${domain}/lark/table/get/config`, {
            key: userId
        });
        return data;
    }
}