// 接口基础地址
export const apiUrl = process.env.apiUrl;

// 身份证号码正则
export const IdentityReg = /^\d{6}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

// 护照
export const passportReg = /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/;

// 手机号码正则
export const MobileReg = /^1[3-9][0-9]{9}$/;

// 固定电话正则
export const FixedTelephoneRge = /^0\d{2,3}-\d{7,8}$/;
// export const FixedTelephoneRge = /^((0\d{2,3})|(852)|(853)|(886))-\d{7,8}$/;
