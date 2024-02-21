/**
 * @description: sc-form表单数据转换form
 * @param {Object} obj
 * @returns {Array}
 */
export const formObjFn = (items) => {
  return items.reduce((obj, item) => {
    obj[item.key] = item.value || ''
    return obj
  }, {})
}