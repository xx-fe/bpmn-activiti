import axios from 'axios';
import serialize from './serialize';

const luRootUrl = 'http://localhost:8000';//待定

const createRequest = function (options) {
    let request = {};
    if (options.dataType && options.dataType.toLowerCase() === 'form') {
        request = axios.create({
            baseURL: `${luRootUrl}${options.baseURL || '/activiti-demo'}`,
            timeout: 60000,
            headers: {
                'Content-Type': options.contentType || 'application/x-www-form-urlencoded',
                'X-Requested-With': 'XMLHttpRequest',
            },
        });
        return request;
    }
    return axios.create({
        baseURL: `${luRootUrl}${options.baseURL || '/activiti-demo'}`,
        timeout: 60000,
        headers: {
            'Content-Type': options.contentType || 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest',
        },
        transformRequest: [function (data) {
            if (options.purejson) {
                return data;
            }
            data = `param=${JSON.stringify(serialize(data))}`;
            // data = 'param=' +  JSON.stringify(data);
            return data;
        }],
    });
};


export default function (options) {
    // 多个参数
    if (options.params) {
        options.params = {
            param: options.params,
        };
    }
    // 一个参数
    if (options.param) {
        options.params = options.param;
    }
    const request = createRequest(options);

    delete options.param;
    return request(options).then(res => {
        if (res.data && (res.data.res_code === '0' || res.data.res_code === '0000')) {
            return res && res.data;
        }
        throw res.data || { res_msg: '' };
    }, e => {
        throw e;
    });
}
