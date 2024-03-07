import type { Context, Application } from "@midwayjs/web";
import type { HttpService } from "@midwayjs/axios";

export interface IBaseAPP {
    Helmet?: any;
    getInitialProps?(params: { ctx: Context; http: HttpService }): Promise<any>;
}
