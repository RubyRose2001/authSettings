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
  department: [
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
  department: [
    { required: true, message: 'Please input department', trigger: 'blur' }
  ],
  // 上级部门
  parentDepartment: [
    { required: true, message: 'Please input parent department', trigger: 'blur' }
  ],
}