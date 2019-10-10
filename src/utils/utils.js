import moment from 'moment';
import React from 'react';
import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';

export function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}

// 获取今日/七天内/30天内 -- 今日之前日期
export function getBeforeTimeDistance(type) {
    let beginTime, endTime;

    if (type === 'today') {
        beginTime = moment().set({ hour: 0, minute: 0, second: 0 });
    } else if (type === 'week') {
        beginTime = moment()
            .set({ hour: 0, minute: 0, second: 0 })
            .subtract(6, 'days');
    } else if (type === 'month') {
        beginTime = moment()
            .set({ hour: 0, minute: 0, second: 0 })
            .subtract(29, 'days');
    }

    endTime = moment().set({ hour: 23, minute: 59, second: 59 });

    return [beginTime, endTime];
}

export function getTimeDistance(type) {
    const now = new Date();
    const oneDay = 1000 * 60 * 60 * 24;

    if (type === 'today') {
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        return [moment(now), moment(now.getTime() + (oneDay - 1000))];
    }

    if (type === 'week') {
        let day = now.getDay();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);

        if (day === 0) {
            day = 6;
        } else {
            day -= 1;
        }

        const beginTime = now.getTime() - day * oneDay;

        return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
    }

    if (type === 'month') {
        const year = now.getFullYear();
        const month = now.getMonth();
        const nextDate = moment(now).add(1, 'months');
        const nextYear = nextDate.year();
        const nextMonth = nextDate.month();

        return [
            moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
            moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
        ];
    }

    const year = now.getFullYear();
    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
    const arr = [];
    nodeList.forEach(node => {
        const item = node;
        item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
        item.exact = true;
        if (item.children && !item.component) {
            arr.push(...getPlainNode(item.children, item.path));
        } else {
            if (item.children && item.component) {
                item.exact = false;
            }
            arr.push(item);
        }
    });
    return arr;
}

export function digitUppercase(n) {
    return nzh.toMoney(n);
}

function getRelation(str1, str2) {
    if (str1 === str2) {
        console.warn('Two path are equal!'); // eslint-disable-line
    }
    const arr1 = str1.split('/');
    const arr2 = str2.split('/');
    if (arr2.every((item, index) => item === arr1[index])) {
        return 1;
    }
    if (arr1.every((item, index) => item === arr2[index])) {
        return 2;
    }
    return 3;
}

function getRenderArr(routes) {
    let renderArr = [];
    renderArr.push(routes[0]);
    for (let i = 1; i < routes.length; i += 1) {
        // 去重
        renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
        // 是否包含
        const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
        if (isAdd) {
            renderArr.push(routes[i]);
        }
    }
    return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
    let routes = Object.keys(routerData).filter(
        routePath => routePath.indexOf(path) === 0 && routePath !== path
    );
    // Replace path to '' eg. path='user' /user/name => name
    routes = routes.map(item => item.replace(path, ''));
    // Get the route to be rendered to remove the deep rendering
    const renderArr = getRenderArr(routes);
    // Conversion and stitching parameters
    const renderRoutes = renderArr.map(item => {
        const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
        return {
            exact,
            ...routerData[`${path}${item}`],
            key: `${path}${item}`,
            path: `${path}${item}`,
        };
    });
    return renderRoutes;
}

export function getPageQuery() {
    return parse(window.location.href.split('?')[1]);
}

export function getQueryPath(path = '', query = {}) {
    const search = stringify(query);
    if (search.length) {
        return `${path}?${search}`;
    }
    return path;
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
    return reg.test(path);
}

export function formatWan(val) {
    const v = val * 1;
    if (!v || Number.isNaN(v)) return '';

    let result = val;
    if (val > 10000) {
        result = Math.floor(val / 10000);
        result = (
            <span>
                {result}
                <span
                    style={{
                        position: 'relative',
                        top: -2,
                        fontSize: 14,
                        fontStyle: 'normal',
                        marginLeft: 2,
                    }}
                >
                    万
                </span>
            </span>
        );
    }
    return result;
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
    return window.location.hostname === 'preview.pro.ant.design';
}

export const importCDN = (url, name) =>
    new Promise(resolve => {
        const dom = document.createElement('script');
        dom.src = url;
        dom.type = 'text/javascript';
        dom.onload = () => {
            resolve(window[name]);
        };
        document.head.appendChild(dom);
    });


export const readXML = (url) => {
    let xml = "", xmlDoc, doc, ele;
    try {
        let xmlhttp = new window.XMLHttpRequest();
        //创建一个新的http请求，并指定此请求的方法、URL以及验证信息
        xmlhttp.open("GET", "http://192.168.73.48:8009/xml.xml", false);
        // xmlhttp.setRequestHeader("Content-Type", "text/xml");
        xmlhttp.send(null);
        if (xmlhttp.readyState == 4) {
            // xmlhttp.overrideMimeType("text/xml")
            console.log(xmlhttp, "解析成了啥")
            xmlDoc = xmlhttp.responseXML.documentElement;
            // return xmlDoc
            xml = (new XMLSerializer()).serializeToString(xmlDoc)

            doc = xmlhttp.responseXML
            ele = doc.getElementsByTagName("bpmndi:BPMNShape")
  

        }
    } catch (e) {
        console.log(e)
    }
    return ele

    //暂时不考虑 IE
    // let xmlDoc;
    // try { //IE浏览器
    //     xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    // } catch (e) { //firefox,opera...火狐、欧朋等浏览器
    //     xmlDoc = document.implementation.createDocument("", "", null);
    // }
    // try {
    //     xmlDoc.asyc = false; //是否异步调用
    //     xmlDoc.load("./xml.xml"); //文件路径
    // } catch (e) {  //chrome


    // }
}