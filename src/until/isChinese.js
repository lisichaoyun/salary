const isAllChinese = function (str) {
  return /^[\u4E00-\u9FA5]+$/.test(str)
}
const hasChinese = function (str) {
  return /[\u4E00-\u9FA5]+/g.test(str)
}

export { isAllChinese, hasChinese }
