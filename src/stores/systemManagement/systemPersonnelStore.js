import { defineStore } from 'pinia'
import {
  getAllUsersApi
  , getUsersApi
  , createUserApi
  , updateUserApi
  , deleteUserApi
  , restoreUserApi
  , updateUserPwdApi
  , updateUsersPwdApi
  , checkUserApi
} from '@/api/user'

export const useSystemPersonnelStore = defineStore('systemPersonnel', () => {
  const users = ref([])
  const params = ref({
    page: 1,
    pagesize: 10,
    sort: 'id',
    dir: 'desc',
    filters: '',
    canceled: 0
  })
  const setParams = (payload) => {
    params.value = payload
  }
  const getAllUsers = async ({ page, pagesize, sort, dir, filters, canceled }) => {
    const { data } = await getAllUsersApi({ page, pagesize, sort, dir, filters, canceled })
    users.value = data
  }
  const getUser = async ({ id }) => {
    const { data } = await getUsersApi({ id })
    users.value = data
  }
  const createUser = async (payload) => {
    const { data } = await createUserApi(payload)
    await getAllUsers(params.value)
    return data
  }
  const updateUser = async (id, payload) => {
    const { data } = await updateUserApi(id, payload)
    await getAllUsers(params.value)
    return data
  }
  const deleteUser = async ({ id }) => {
    const { data } = await deleteUserApi({ id })
    await getAllUsers(params.value)
    return data
  }
  const restoreUser = async ({ id }) => {
    const { data } = await restoreUserApi({ id })
    await getAllUsers(params.value)
    return data
  }
  const updateUsersPwd = async (id) => {
    const { data } = await updateUsersPwdApi(id)
    return data
  }
  // 當下使用者修改
  const updatePersonalPwd = async (payload) => {
    const { data } = await updateUserPwdApi(payload)
    return data
  }

  const checkUser = async (user) => {
    const { data } = await checkUserApi(user)
    return data?.data?.data
  }

  return {
    users,
    setParams,
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    restoreUser,
    updateUsersPwd,
    updatePersonalPwd,
    checkUser
  }
})
