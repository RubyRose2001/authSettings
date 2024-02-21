/**
 * @module user
 * @description 用户管理
 * @author sun
 * @time 2024/02/04
 */
import http from '@/utils/http.utils'

// 获取部门列表tree
export const getDeptList = (data: any) => http.post('/service/system/dept/list', data)

// 新增部门
export const addDept = (data: any) => http.post('/service/system/dept/add', data)

