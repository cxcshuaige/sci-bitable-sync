import R from "@ecoding/helper.got";
const r = R.getInstance();
const getHttp = (env) => {
    // switch (env) {
    //     case EnvEnum.local:
    //     case EnvEnum.test: {
    //         r.setDomain("");
    //     }
    //     default: {
    //         r.setDomain("");
    //     }
    // }
    const originPrefix = {
        f2e: "http://127.0.0.1:7004",
        f2esg: {
            local: "http://127.0.0.1:7005"
        }
    };
    r.setDomain((api) => {
        let domain = "";
        if(/^\/f2e?\//.test(api)){
            domain = originPrefix.f2e;
        }
        if(/^\/f2e-sg?\//.test(api)){
            domain = originPrefix.f2esg[env] || "http://f2e-api-sg.sciecomm.cn";
        }
        return domain;
    });
    r.setReqHook(async (options) => {
        return Promise.resolve(options);
    });
    return r;
}
export default getHttp;