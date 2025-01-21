// 邮箱正则
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

// 中国大陆手机号
const mobileRegex = /^1[3-9]\d{9}$/

// 座机验证
const landlineRegex = /^0\d{2,3}-?\d{7,8}$/

// 身份证号正则
const idCardRegex =
  /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// 邮政编码正则
const postalCodeRegex = /^[1-9]\d{5}$/

// 车牌号正则
const carNumberRegex =
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/

// 日期正则
// 示例：2025-01-01
const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

// 金额正则
const amountRegex = /^[1-9]\d*(\.\d{1,2})?$/

export {
  emailRegex,
  mobileRegex,
  landlineRegex,
  idCardRegex,
  postalCodeRegex,
  carNumberRegex,
  dateRegex,
  amountRegex
}
