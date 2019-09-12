/*
 * @Author: wqjiao
 * @Date: 2019-03-28 20:23:42
 * @Last Modified by: wqjiao
 * @Last Modified time: 2019-09-12 15:00:50
 * @Description: 公共方法
 */
import moment from 'moment';
import {isArray} from 'util';
import {IdentityReg, MobileReg, FixedTelephoneRge} from './constants';

/**
 * @method 日期转换
 * @description 日期选择器 || 区间选择器
 * @param [Moment/Array] value 日期/区间选择器 value
 * @param [String] format 转换类型 或 默认 YYYY-MM-DD
 */
export function formatPicker(value, format) {
    format = format || 'YYYY-MM-DD';
    // 日期选择器
    if (moment.isMoment(value)) {
        return value.format(format);
    }

    // 区间选择器
    if (isArray(value) && moment.isMoment(value[0]) && moment.isMoment(value[1])) {
        return [value[0].format(format), value[1].format(format)];
    }
}

/**
 * @param {*} e
 * @returns Input 正则匹配 手机号码
 */
export function getPhoneValue(e) {
    let value = e.target.value;

    if (!MobileReg.test(value)) {
        value = value.replace(/[^0-9]/g, '');
    }
    return value;
}

/**
 * @param {*} e
 * @returns Input 正则匹配 固定电话
 */
export function getFixedTelephone(e) {
    let value = e.target.value;

    if (!FixedTelephoneRge.test(value)) {
        value = value.replace(/[^0-9-]/g, '');
    }
    return value;
}

/**
 * @param {*} e
 * @returns 校验身份证号
 */
export function getIdentityValue(e) {
    let value = e.target.value;

    if (!IdentityReg.test(value)) {
        // value = value.replace(/[\u4e00-\u9fa5|,]+/, ''); // 过滤中文
        // value = value.replace(/[\u4e00-\u9fa5a-wy-zA-WY-Z]+/, ''); // 过滤不必要的英文
        // value = value.replace(/[^\d{18}$)|(^\d{17}(\d|X|x]/, '');
        value = value.replace(/[^\dxX]+/, '');
    }
    return value;
}

// 根据 身份证号: value 获取相应类型
export function getIdentityTypes(value) {
    const province = value.substring(0, 2); // 省
    const city = value.substring(0, 4); // 市
    const area = value.substring(0, 6); // 区
    const year = value.substring(6, 10); // 年
    const month = value.substring(10, 12); // 月
    const day = value.substring(12, 14); // 日
    const sex = value.substring(16, 17); // 性别

    return {
        province,
        city,
        area,
        year,
        month,
        day,
        birth: `${year}-${month}-${day}`,
        sex: sex % 2 === 0 ? '2' : '1', // 2 -- 女; 1 -- '
    };
}

/**
 * @param {Array} arr 需要转换的数组
 * @param {Atring} char 拼接字符
 * @returns {String} 字符串
 * @description 数组拼接字符串
 */
export function arrJoinStr(arr, char) {
    return arr ? arr.join(char) : '';
}

/**
 * @param {*} value
 * @returns {*} 数字或空字符串 整数
 * @description 仅数字输入框，非数字清空输入框
 */
export function inputNumber(value) {
    const reg = /^(\d+)*$/;

    if (typeof value === 'string') {
        return !isNaN(Number(value)) ? value.replace(reg, '$1') : '';
    } else if (typeof value === 'number') {
        return !isNaN(value) ? String(value).replace(reg, '$1') : '';
    } else {
        return '';
    }
}

/**
 * @return {*} value
 * @description 指定输入框转换数字(最多两位小数)
 */
export function limitDecimals(value, maxReg, max) {
    const reg = /^(\d+)\.(\d\d).*$/;
    let bef = '',
        _value = String(value);

    maxReg = maxReg || /^(\d{1,7})$/;
    max = max || 7;

    // 截取小数点前面正整数
    if (_value.indexOf('.') != -1) {
        const index = _value.indexOf('.');
        bef = _value.substring(0, index);
    } else {
        bef = _value;
    }

    // 限制输入7位
    if (bef && !maxReg.test(bef)) {
        value = bef.substring(0, max);
    }

    if (typeof value === 'string') {
        return !isNaN(Number(value)) ? value.replace(reg, '$1.$2') : '';
    } else if (typeof value === 'number') {
        return !isNaN(value) ? String(value).replace(reg, '$1.$2') : '';
    } else {
        return '';
    }
}

/**
 * @param {*} e
 * @returns 车牌号 正则 匹配
 */
export function getCarNmuber(e) {
    let value = e;
    let plat_number_reg = /^(京|津|沪|渝|冀|豫|云|辽|晋|湘|皖|鲁|鄂|苏|浙|赣|新|桂|甘|黑|蒙|陕|吉|闽|贵|粤|青|藏|川|宁|琼)[A-Za-z][A-Za-z0-9]{5,7}$/;
    if (value && plat_number_reg.test(value)) {
        return false;
    }
    return true;
}

/**
 * @param {*} e
 * @returns 校验只能输入数字和字母
 */
export function getNumberLetter(e) {
    let value = e.target.value;

    value = value.replace(/[\u4e00-\u9fa5|,]+/, ''); // 过滤中文
    return value;
}

/**
 * @param {*} current
 * @param {String} end 结束的节点 day||week||year||hour||minute||second
 * @returns 禁止选择 ${end} 之后的日期||时间
 * @use 默认：disabledDate={disabledDate} 或者
 *  传值：disabledDate={(current) => disabledDate(current, 'second')}
 */
export function disabledDate(current, end = 'day') {
    // Can not select days before today and today
    return current && current > moment().endOf(end);
}

/**
 * @return 差集数据
 * @param [Array] oldValues 原数组
 * @param [Array] newValues 当前数组
 */
export function getDifference(oldValues, newValues) {
    let diff = oldValues.concat(newValues).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
    return Array.from(new Set(diff));
}

/**
 * @return 交集数据
 * @param [Array] oldValues 原数组
 * @param [Array] newValues 当前数组
 */
export function getIntersect(oldValues, newValues) {
    let newSet = new Set(newValues);
    let intersect = new Set([...oldValues].filter(x => newSet.has(x)));
    return Array.from(intersect);
}
