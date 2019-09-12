import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import {formatMessage} from 'umi/locale';
import Authorized from '@/utils/Authorized';
import {menu} from '../defaultSettings';
import {getMenu} from '@/services/api';
// import {debug} from 'util';

const {check} = Authorized;

// Conversion router to menu.
function formatter(data, parentName) {
    if (!data) {
        return undefined;
    }
    return data
        .map(item => {
            if (!item.name || !item.path) {
                return null;
            }

            let locale = 'menu';
            if (parentName) {
                locale = `${parentName}.${item.name}`;
            } else {
                locale = `menu.${item.name}`;
            }
            // if enableMenuLocale use item.name,
            // close menu international
            const name =
                menu.disableLocal && item.cnName
                    ? // cnName是后端返回的中文菜单名
                      item.cnName
                    : formatMessage({id: locale, defaultMessage: item.name});

            const result = {
                ...item,
                name,
                locale,
            };

            if (item.routes) {
                const children = formatter(item.routes, locale);
                // Reduce memory usage
                result.children = children;
            }
            delete result.routes;
            return result;
        })
        .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);
/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
        return {
            ...item,
            children: filterMenuData(item.children), // eslint-disable-line
        };
    }
    return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
    if (!menuData) {
        return [];
    }
    // 过滤hideMenu和权限要求的菜单，返回可以展示的菜单。
    return menuData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => check(item.authority, getSubMenu(item)))
        .filter(item => item);
};

/**
 * 遍历子菜单中的数据
 */
const getSubRouteMenu = (rItem, uItem) => {
    // doc: add hideChildrenInMenu
    if (rItem.routes) {
        matchRouteAndUserMenu(rItem.routes, uItem.children); // eslint-disable-line
    }
};

/**
 * 比较用户菜单数据和路由数据，获取该用户有访问权限的菜单数据
 */
const matchRouteAndUserMenu = (routes, userMenu) => {
    if (!routes) {
        return [];
    }
    if (!userMenu) {
        return routes;
    }

    routes.forEach(rItem => {
        userMenu.forEach(uItem => {
            if (rItem.path === uItem.path) {
                // 更新route.config.js中的数据
                rItem.cnName = uItem.name;
                rItem.auth = uItem.auth;
                // 遍历子菜单中的数据，进行比较
                getSubRouteMenu(rItem, uItem);
            }
        });
    });
};

/**
 * 遍历子菜单中的数据
 */
const getSubUserMenu = (mItem, uItem) => {
    // doc: add hideChildrenInMenu
    if (mItem.children && !mItem.hideChildrenInMenu && mItem.children.some(child => child.name)) {
        return matchingUserMenu(mItem.children, uItem.children); // eslint-disable-line
    }
    return [];
};

/**
 * 比较用户菜单数据和路由数据，获取该用户有访问权限的菜单数据
 */
const matchingUserMenu = (menuData, userMenu) => {
    if (!menuData) {
        return [];
    }
    let menuRoot = [];
    userMenu.forEach(uItem => {
        menuData.forEach(mItem => {
            if (mItem.path === uItem.path) {
                // 遍历子菜单中的数据，进行比较
                let children = getSubUserMenu(mItem, uItem);
                menuRoot.push({
                    ...mItem,
                    ...uItem,
                    children,
                });
            }
        });
    });
    return menuRoot;
};

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
    if (!menuData) {
        return {};
    }
    const routerMap = {};

    const flattenMenuData = data => {
        data.forEach(menuItem => {
            if (menuItem.children) {
                flattenMenuData(menuItem.children);
            }
            // Reduce memory usage
            routerMap[menuItem.path] = menuItem;
        });
    };
    flattenMenuData(menuData);
    return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(getBreadcrumbNameMap, isEqual);

export default {
    namespace: 'menu',

    state: {
        menuData: [],
        routerData: [],
        breadcrumbNameMap: {},
    },

    effects: {
        *getMenuData({payload}, {call, put}) {
            // 路由数据
            const {routes} = payload;
            // 获取该用户可以访问的菜单数据
            const response = yield call(getMenu, payload);
            if (!response) {
                return;
            }
            // 将用户数据和路由数据合并，是为了给route绑定auth数据
            matchRouteAndUserMenu(routes, response.data);
            // 整理菜单数据
            const originalMenuData = memoizeOneFormatter(routes);
            const menuData = filterMenuData(originalMenuData);
            // 和页面路由对比，生成该用户的菜单
            const userRoutes = matchingUserMenu(menuData, response.data);

            // 面包屑导航
            const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(originalMenuData);
            // 更新数据
            yield put({
                type: 'save',
                payload: {menuData: userRoutes, breadcrumbNameMap, routerData: routes},
            });
        },
    },

    reducers: {
        save(state, action) {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
};
