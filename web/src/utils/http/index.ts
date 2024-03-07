import axios from 'axios';
import { Loading, Toast, http } from '@ecoding/components.antd';
import { portalHttp } from '@sciecomm/portal.components';
import R from '@ecoding/helper.request.hook';
export const ignoreTokenInterFace: string[] = [];

const request = new R(axios);
request.setFinallyHook(() => {
    Loading.hide();
});
request.setResTranslateHook((out, res) => {
    return {
        success: res.successed || res.success,
        code: res.code,
        msg: res.message || res.msg,
        message: res.message || res.msg,
        data: res.model || res.data
    };
});
request.setErrorUiHook((err) => {
    Toast.error({
        mask: true,
        duration: 20000,
        title: String(err.message || err.msg)
    });
});
http.setOutRequest(request);
portalHttp.setOutRequest(request);
export const r = request;
export const useGet = request.getUseGet();
export const usePost = request.getUsePost();
