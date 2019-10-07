/*
 *
 * common constants
 *
 */
export const AUDIT_LEVEL = [
    {
        code: 'AL1',
        desc: '初审',
    },
    {
        code: 'AL2',
        desc: '复审',
    },
];
export const PAGE_SIZE_LIST = [15, 50, 100];
// 任务类型
export const TASK_TYPE = [
    {
        code: 'YUNYING',
        desc: '运营任务',
    },
    {
        code: 'HEGUI',
        desc: '合规任务',
    },
    {
        code: 'BLACKLIST',
        desc: '黑名单任务',
    },
];

// 状态
export const STATUS = [
    {
        code: ['WAIT_INPUT'],
        desc: '待初审',
        key: 0,
    },
    {
        code: ['WAIT_REVIEW'],
        desc: '待复审',
        key: 1,
    },
    {
        code: ['FINISH'],
        desc: '已处理',
        key: 2,
    },
];
/**
 * 状态 audit
 */
export const AUDIT_STATUS = [
    {
        index: 0,
        code: 'WAIT_INPUT',
        desc: '待初审',
    },
    {
        index: 1,
        code: 'WAIT_REVIEW',
        desc: '待复审',
    },
    {
        index: 2,
        code: 'FINISH',
        desc: '已处理',
    },
];
export const BIZ_TYPE = [
    {
        code: 'OPEN_ACCOUNT_PURPOSE',
        desc: '开户目的审核',
    },
    {
        code: 'ANNUAL_INCOME_MATCH',
        code1: 'INCOME',
        desc: '年收入匹配性审核',
    },
    {
        code: 'BLACKLIST_PASSIVE',
        desc: '黑名单及负面信息审核',
    },
    {
        code: 'FUNDING_SOURCE',
        code1: 'CAPITAL',
        desc: '资金来源及收入证明审核',
    },
    {
        code: 'ASSET_APPROVE',
        code1: 'CAPITAL',
        desc: '资金来源及收入证明审核',
    },
    {
        code: 'SUSPECT_CHEAT',
        desc: '疑似欺诈审核',
    },
    {
        code: 'HIGH_RISK_RESIDENTIAL_ADDRESS',
        desc: '高风险-常住地址审核',
    },
];

export const CONFIG_LIST = [
    {
        code: 'AUDIT_PASS',
        desc: '通过',
    },
    {
        code: 'AUDIT_REJECT',
        desc: '不通过',
    },
    {
        code: 'REVIEW_AUDIT',
        desc: '完成',
    },
    {
        code: 'REVIEW_AML',
        desc: '疑似欺诈',
    },
    {
        code: 'REVIEW_BACK',
        desc: '返回上一步',
    },
    {
        code: 'REVIEW_SAVE',
        desc: '保存',
    },
];
export const USER_TYPE = [
    {
        code: 'LAND_USER',
        desc: '大陆居民',
        desc1: '大陆',
        key: '0',
    },
    {
        code: 'HK_LAST_USER',
        desc: '香港永久居民',
        desc1: '香港永久居民',
        key: '1',
    },
    {
        code: 'HK_SNAP_USER',
        desc: '香港临时居民',
        desc1: '香港非永久居民',
        key: '2',
    },
];
export const ACTION_TYPE = [
    // 这里应该还有返回上一步按钮TODO
    {
        actionCode: 'REVIEW_BACK',
        actionDesc: '返回上一岗', // 返回上一岗
        eventCode: 'TO_BACK', // 事件代码
    },
    {
        actionCode: 'REVIEW_SAVE',
        actionDesc: '保存', // 保存
        eventCode: '', // 事件代码，本地缓存，不走状态机
    },
    {
        actionCode: 'REVIEW_AUDIT',
        actionDesc: '完成', // 完成
        eventCode: 'TO_REVIEW', // 事件代码
    },
    {
        actionCode: 'REVIEW_AML',
        actionDesc: '疑似欺诈', // 疑似欺诈
        eventCode: 'TO_REVIEW', // 事件代码
    },
];
export const ACTION_INFO_LIST = [
    {
        actionCode: 'AUDIT_PASSS',
        actionDesc: '通过', // 通过
        eventCode: 'AUDIT_PASSS', // 事件代码
    },
    {
        actionCode: 'AUDIT_REJECT',
        actionDesc: '不通过', // 不通过
        eventCode: 'AUDIT_REJECT', // 事件代码
    },
];

export const AUDIT_LEVEL_STATUS = [
    {
        code: 'L1_WAIT_AUDIT',
        desc: 'L1初审',
        key: 0,
    },
    {
        code: 'L1_WAIT_AUDIT_DONE',
        desc: 'L1初审完成',
        key: 1,
    },
    {
        code: 'L1_WAIT_REVIEW',
        desc: 'L1复审',
        key: 2,
    },
    {
        code: 'L1_WAIT_REVIEW_DONE',
        desc: 'L1复审完成',
        key: 3,
    },
    {
        code: 'L2_WAIT_AUDIT',
        desc: 'L2审核',
        key: 4,
    },
    {
        code: 'L2_WAIT_AUDIT_DONE',
        desc: 'L2审核完成',
        key: 5,
    },
    {
        code: 'COMPLIANCE_AUDIT',
        desc: '合规官审核',
        key: 6,
    },
    {
        code: 'FINISH',
        desc: '审核结束',
        key: 7,
    },
    {
        code: 'ABORT',
        desc: '审核终止',
        key: 8,
    },
];

// 性别
export const SEX = [
    {
        code: '1',
        desc: '男',
    },
    {
        code: '0',
        desc: '女',
    },
];

// 风险等级
export const FINAL_RISK_RATE = [
    {
        key: '1',
        code: 'LOW_RISK',
        desc: '低风险',
    },
    {
        key: '2',
        code: 'MID_LOW_RISK',
        desc: '中低风险',
    },
    {
        key: '3',
        code: 'MID_RISK',
        desc: '中风险',
    },
    {
        key: '4',
        code: 'MID_HIGH_RISK',
        desc: '中高风险',
    },
    {
        key: '5',
        code: 'HIGH_RISK',
        desc: '高风险',
    },
];

// 常住地址是否与身份证住址一致
export const IS_IDCARD_ADDRESS = [
    {
        code: '1',
        desc: '一致',
    },
    {
        code: '0',
        desc: '不一致',
    },
];

/**
 * 格式化列表中的状态字段
 * @param {string} value 
 */
export function bizTypeFilter(value) {
    switch (value) {
        case "OCR":
            return ""
        case "FACE":
            return
        case "CNEN":
            return
        case "ADDRESS":
            return
        case "OPEN_ACCOUNT_INFO":
            return
        case "OPEN_ACCOUNT_PURPOSE":
            return "开户目的审核"
        case "HIGH_RISK_RESIDENTIAL_ADDRESS":
            return "高风险常住地址审核"
        default:
            return ""
    }
}


/**
 * 格式化列表中数据的场景类型
 * @param {string} value 
 */
export function statusFilter(value) {
    switch (value) {
        case "L1_WAIT_AUDIT":
            return "L1待初审"
        case "L1_WAIT_AUDIT_DONE":
            return "L1初审完成"
        case "L1_WAIT_REVIEW":
            return "L1待复审"
        case "L1_WAIT_REVIEW_DONE":
            return "L1复审完成"
        case "L2_WAIT_AUDIT_DONE":
            return "L2审核完成"
        case "COMPLIANCE_AUDIT":
            return "待合规官审核"
        case "FINISH":
            return "已完成"
        default:
            return ""
    }
}

/**
 * 格式化金额
 * @param {number|string} value
 */
export function formatAmount(value) {
    if (value === undefined || value === null) {
        return '$0.00';
    }
    const isNegative = Math.abs(value) != value;
    return (
        (isNegative ? '-$' : '$') + CurrencyUtils.formatCurrencyWithTwoDecimal(Math.abs(value) || 0)
    );
}

class CurrencyUtils {
    /**
     * [formatCurrency
     * 添加千分位逗号
     * point Boolean 是否需要小数位
     * 默认保留两位小数，整数不保留小数
     * @param  {Number} num   [?]
     * @param  {Boolean} point [?]
     * @return {String}       [?]
     */
    static formatCurrency(num, point) {
        const myNum = parseFloat(num);
        let myNumber = Math.abs(myNum);
        const sign = myNum === myNumber;
        myNumber = Math.floor(myNumber * 100 + 0.50000000001);
        let cents = myNumber % 100;
        myNumber = Math.floor(myNumber / 100).toString();
        if (cents < 10) {
            cents = `0${cents}`;
        }
        for (let i = 0; i < Math.floor((myNumber.length - (1 + i)) / 3); i++) {
            myNumber = `${myNumber.substring(
                0,
                myNumber.length - (4 * i + 3)
            )},${myNumber.substring(myNumber.length - (4 * i + 3))}`;
        }
        if (point) {
            return (sign ? '' : '-') + myNumber;
        }
        if (cents === '00') {
            return (sign ? '' : '-') + myNumber;
        }
        return `${(sign ? '' : '-') + myNumber}.${cents}`;
    }

    /**
     * [formatCurrencyWithTwoDecimal 添加千分位，并保留两位小数,整数保留.00]
     * @param  {number} num [description]
     * @return {number}     [description]
     */
    static formatCurrencyWithTwoDecimal(num) {
        const myNum = parseFloat(num);
        let myNumber = Math.abs(num);
        const sign = myNum === myNumber ? '' : '-';
        myNumber = Math.floor(myNumber * 100 + 0.50000000001);
        let cents = myNumber % 100;
        myNumber = Math.floor(myNumber / 100).toString();
        if (cents < 10) {
            cents = `0${cents}`;
        }
        for (let i = 0; i < Math.floor((myNumber.length - (1 + i)) / 3); i++) {
            myNumber = `${myNumber.substring(
                0,
                myNumber.length - (4 * i + 3)
            )},${myNumber.substring(myNumber.length - (4 * i + 3))}`;
        }
        return `${sign + myNumber}.${cents}`;
    }

    /**
     * 数字转中文大写
     * @author yejia338
     * @date   2016-05-16
     * @param  {string} currencyDigits [数字]
     * @return {string} outputCharacters [中文大写]
     */
    static getOutputCharacters(currencyDigits) {
        let currencyDigitsValue = currencyDigits;
        // max number
        const MAXIMUM_NUMBER = 99999999999.99;
        // Predefine the radix characters and currency symbols for output:
        const CN_ZERO = '零';
        const CN_ONE = '壹';
        const CN_TWO = '贰';
        const CN_THREE = '叁';
        const CN_FOUR = '肆';
        const CN_FIVE = '伍';
        const CN_SIX = '陆';
        const CN_SEVEN = '柒';
        const CN_EIGHT = '捌';
        const CN_NINE = '玖';
        const CN_TEN = '拾';
        const CN_HUNDRED = '佰';
        const CN_THOUSAND = '仟';
        const CN_TEN_THOUSAND = '万';
        const CN_HUNDRED_MILLION = '亿';
        // const CN_SYMBOL = '人民币';
        const CN_DOLLAR = '元';
        const CN_TEN_CENT = '角';
        const CN_CENT = '分';
        const CN_INTEGER = '整';
        // Variables:
        let integral = '';
        // Represent integral part of digit number.
        let decimal = '';
        // Represent decimal part of digit number.
        let outputCharacters = '';
        // The output result.
        let parts = '';
        let digits = '';
        let radices = '';
        let bigRadices = '';
        let decimals = '';
        let zeroCount = 0;
        let i = 0;
        let p = 0;
        let d = '';
        let dnum = 0;
        let quotient = 0;
        let modulus = 0;
        // Validate input string:
        currencyDigitsValue += '';
        if (currencyDigitsValue === '') {
            return '输入框输入值无效';
        }
        if (currencyDigitsValue.match(/[^,.\d]/) != null) {
            return '输入了错误字符';
        }
        //      if ((currencyDigitsValue).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) {
        if (currencyDigitsValue.match(/^((\d{1,3}(,\d{3})*(.\d+)?)|(\d+(.\d+)?))$/) == null) {
            return '输入了错误的数字';
        }
        // Normalize the format of input digits:
        currencyDigitsValue = currencyDigitsValue.replace(/,/g, '');
        // Remove comma delimiters.
        currencyDigitsValue = currencyDigitsValue.replace(/^0+/, '');
        // Trim zeros at the beginning.
        // Assert the number is not greater than the maximum number.
        if (Number(currencyDigitsValue) > MAXIMUM_NUMBER) {
            return '输入数字太大';
        }
        // hack by wr
        currencyDigitsValue = parseFloat(currencyDigitsValue);
        currencyDigitsValue += '';
        // Process the coversion from currency digits to characters:
        // Separate integral and decimal parts before processing coversion:
        parts = currencyDigitsValue.split('.');
        if (parts.length > 1) {
            integral = parts[0];
            decimal = parts[1];
            // Cut down redundant decimal digits that are after the second.
            decimal = decimal.substr(0, 2);
        } else {
            integral = parts[0];
            decimal = '';
        }
        // Prepare the characters corresponding to the digits:
        digits = [
            CN_ZERO,
            CN_ONE,
            CN_TWO,
            CN_THREE,
            CN_FOUR,
            CN_FIVE,
            CN_SIX,
            CN_SEVEN,
            CN_EIGHT,
            CN_NINE,
        ];
        radices = ['', CN_TEN, CN_HUNDRED, CN_THOUSAND];
        bigRadices = ['', CN_TEN_THOUSAND, CN_HUNDRED_MILLION];
        decimals = [CN_TEN_CENT, CN_CENT];
        // Start processing:
        outputCharacters = '';
        // Process integral part if it is larger than 0:
        if (Number(integral) > 0) {
            zeroCount = 0;
            for (i = 0; i < integral.length; i++) {
                p = integral.length - i - 1;
                d = integral.substr(i, 1);
                quotient = p / 4;
                modulus = p % 4;
                if (d === '0') {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        outputCharacters += digits[0];
                    }
                    zeroCount = 0;
                    dnum = Number(d);
                    outputCharacters += digits[dnum] + radices[modulus];
                }
                if (modulus === 0 && zeroCount < 4) {
                    outputCharacters += bigRadices[quotient];
                }
            }
            outputCharacters += CN_DOLLAR;
        }
        // Process decimal part if there is:
        if (decimal !== '') {
            for (i = 0; i < decimal.length; i++) {
                d = decimal.substr(i, 1);
                if (d !== '0') {
                    dnum = Number(d);
                    outputCharacters += digits[dnum] + decimals[i];
                }
            }
        }
        // Confirm and return the final output string:
        if (outputCharacters === '') {
            outputCharacters = CN_ZERO + CN_DOLLAR;
        }
        if (decimal === '') {
            outputCharacters += CN_INTEGER;
        }
        return outputCharacters;
    }
}
