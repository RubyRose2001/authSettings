// 校验手机号格式
const validatePhone = (rule, value, callback) => {
  const reg = /^1[3456789]\d{9}$/
  if (value && !reg.test(value)) {
    callback(new Error('Please input correct phone number'))
  } else {
    callback()
  }
}
export const addUserRules = {
  username: [
    { required: true, message: 'Please input name', trigger: 'blur' },
    { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' }
  ],
  deptName: [
    { required: true, message: 'Please input department', trigger: 'blur' }
  ],
  post: [
    { required: true, message: 'Please input post', trigger: 'blur' }
  ],
  phone: [
    { required: false, message: 'Please input phone', trigger: 'blur' },
    // validator
    { validator: validatePhone, trigger: 'blur' }
  ],
}

export const editUserRules = {
  // 部门名称
  deptName: [
    { required: true, message: '请输入部门名称', trigger: 'blur' }
  ],
  // 上级部门
  parentId: [
    { required: true, message: '请选择上级部门', trigger: 'blur' }
  ],
  // 显示顺序
  orderNum: [
    { required: true, message: '请输入显示顺序', trigger: 'blur' }
  ]
}