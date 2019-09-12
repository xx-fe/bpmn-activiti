import {routerRedux} from 'dva/router';
import {stringify} from 'qs';
import {loginAccount, getFakeCaptcha} from '@/services/api';
// import {setAuthority} from '@/utils/authority';
import {getPageQuery} from '@/utils/utils';
// import {reloadAuthorized} from '@/utils/Authorized';

export default {
    namespace: 'login',

    state: {
        status: undefined, // 登录状态
        msg: '', // 错误信息，由接口返回
    },

    effects: {
        *login({payload}, {call, put}) {
            const response = yield call(loginAccount, payload);
            if (!response) {
                return;
            }
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            // Login successfully
            if (response.code === 200) {
                window.localStorage && window.localStorage.setItem('token', response.data);

                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let {redirect} = params;
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.match(/^\/.*#/)) {
                            redirect = redirect.substr(redirect.indexOf('#') + 1);
                        }
                    } else {
                        window.location.href = redirect;
                        return;
                    }
                }
                yield put(routerRedux.replace(redirect || '/'));
            }
        },

        *getCaptcha({payload}, {call}) {
            yield call(getFakeCaptcha, payload);
        },

        *logout(_, {put}) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false,
                },
            });

            window.localStorage && window.localStorage.removeItem('token');

            if (window.location.hash.indexOf('/user/login') < 0) {
                yield put(
                    routerRedux.replace({
                        pathname: '/user/login',
                        search: stringify({
                            redirect: window.location.href,
                        }),
                    })
                );
            }
        },
    },

    reducers: {
        changeLoginStatus(state, {payload}) {
            return {
                ...state,
                status: payload.code === 200,
                msg: payload.msg,
            };
        },
    },
};
