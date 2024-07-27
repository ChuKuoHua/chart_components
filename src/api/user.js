import { service } from '@/utils/service.js'

/**
 * 使用者登入
 * @param {object} data 登入資料
 * @returns
 */
export function LoginApi (data) {
  return service({
    method: 'POST',
    url: '/api/auth/login',
    data
  })
}
/**
 * 查詢全部人員資料
 * @param {number} page 頁數
 * @param {number} pagesize 筆數
 * @param {string} sort 要排序的欄位
 * @param {string} dir 排序 asc 或 desc
 * @param {string} filters 搜尋
 * @param {number|string} canceled 1 - 已作廢或 0 - 未作廢
 * @returns {data}
 */
export function getAllUsersApi ({ page, pagesize, sort, dir, filters, canceled }) {
  return service({
    method: 'GET',
    url: '/api/v1/users',
    params: {
      page,
      canceled,
      pagesize,
      sort,
      dir,
      username: filters
    }
  })
}
/**
 * 查詢人員資料
 * @param {string} id 人員id
 * @returns {data}
 */
export function getUsersApi ({ id }) {
  return service({
    method: 'GET',
    url: `/api/v1/users/${id}`
  })
}
/**
 * 新增人員資料
 * @param {object} data 人員資料
 * @returns {成功/失敗}
 */
export function createUserApi (data) {
  return service({
    method: 'POST',
    url: '/api/v1/users',
    data
  })
}
/**
 * 修改人員資料
 * @param {string} id 使用者 id
 * @param {object} data 修改資料
 * @returns {成功/失敗}
 */
export function updateUserApi (id, data) {
  return service({
    method: 'PUT',
    url: `/api/v1/users/${id}`,
    data
  })
}
/**
 * 作廢人員
 * @param {string} id 使用者 id
 * @returns {成功/失敗}
 */
export function deleteUserApi ({ id }) {
  return service({
    method: 'DELETE',
    url: `/api/v1/users/${id}`
  })
}
/**
 * 復原人員
 * @param {string} id 使用者 id
 * @returns {成功/失敗}
 */
export function restoreUserApi ({ id }) {
  return service({
    method: 'PUT',
    url: `/api/v1/users/${id}/restore`
  })
}
/**
 * 修改人員密碼
 * @param {string} id 使用者 id
 * @param {object} data 新密碼
 * @returns {成功/失敗}
 */
export function updateUsersPwdApi (id) {
  return service({
    method: 'PUT',
    url: `/api/v1/users/actions/resetpw/${id}`
  })
}
/**
 * 修改個人
 * @param {object} data 新密碼
 * @returns {成功/失敗}
 */
export function updateUserPwdApi (data) {
  return service({
    method: 'PUT',
    url: '/api/v1/users/actions/changepswd',
    data
  })
}
/**
 * 檢查人員是否存在
 * @param {string} user 人員帳號
 * @returns {成功/失敗}
 */
export function checkUserApi (user) {
  return service({
    method: 'GET',
    url: '/api/v1/users',
    params: {
      _username: user,
      canceled: 0
    }
  })
}
