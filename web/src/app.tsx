import './assets/less/pages/main.less';
import React, { useEffect } from 'react';
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { hideSkeleton } from "@ecoding/components.dom";
import i18n from "@/locales";
import { theme } from "@/theme";
import Routes from "./routes";


const App: React.FC = () => {
    useEffect(() => {
        hideSkeleton();
    }, [])
    return (
        <>
            <BrowserRouter basename="/">
                <ConfigProvider locale={i18n.getLocale()} theme={theme}>
                    <Routes />
                </ConfigProvider>
            </BrowserRouter>
        </>
    );
};

export default App;