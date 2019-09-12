import {query as queryUsers, queryCurrent} from '@/services/user';

export default {
    namespace: 'user',

    state: {
        list: [],
        currentUser: {
            // 给一个默认的logo
            avatar:
                'https://user-gold-cdn.xitu.io/2019/9/11/16d1bec29f3b3d38?imageView2/1/w/120/h/120/q/85/format/webp/interlace/1',
        },
    },

    effects: {
        *fetch(_, {call, put}) {
            const response = yield call(queryUsers);
            if (!response) {
                return;
            }
            yield put({
                type: 'save',
                payload: response,
            });
        },
        *fetchCurrent({callback}, {call, put}) {
            const response = yield call(queryCurrent);
            if (!response) {
                return;
            }
            yield put({
                type: 'saveCurrentUser',
                payload: response,
            });
            if (callback) callback(response);
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                list: action.payload,
            };
        },
        saveCurrentUser(state, {payload}) {
            let newState = {...state};
            newState.currentUser = {
                ...newState.currentUser,
                ...payload.data,
            };
            return newState;
        },
        changeNotifyCount(state, action) {
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    notifyCount: action.payload.totalCount,
                    unreadCount: action.payload.unreadCount,
                },
            };
        },
    },
};
