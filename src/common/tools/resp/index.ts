interface IOpts {
    code?: number;
    data?: any;
    message?: string;
}

export function success(opts: IOpts = {}) {
    const res = Object.assign(
        {},
        opts.code ? { code: opts.code } : { code: 200 },
        opts.data ? { data: opts.data } : { data: null },
        {
            success: true,
        }
    );
    return res;
}

export function fail(opts: IOpts = {}) {
    const res = Object.assign(
        {},
        opts.code ? { code: opts.code } : { code: 502 },
        opts.message
            ? { message: opts.message }
            : { message: "系统异常，请联系管理员" },
        {
            success: false,
        }
    );
    return res;
}
