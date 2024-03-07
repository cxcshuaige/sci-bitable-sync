import React from "react";
import { Result } from "antd";
const C: React.FC = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <Result
                status="403"
                title="用户信息错误"
                subTitle="你的登录已失效，请重新登录"
            />
        </div>
    );
};

export default C;
