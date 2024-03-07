import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
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
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={
                    <Button type="primary">
                        <Link to="/">Back Home</Link>
                    </Button>
                }
            />
        </div>
    );
};

export default C;
