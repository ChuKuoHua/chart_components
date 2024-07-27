import axios from 'axios'

import { useLoadingStore } from '@/stores/base/loadingStore.js'
import { useUserStore } from '@/stores/userStore.js'
import router from '@/router/index.js'
const baseUrl = import.meta.env.VITE_BASE_URL
// create an axios instance
const service = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 30000, // request timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

// request interceptor
service.interceptors.request.use(
  async (config) => {
    const loadingStore = useLoadingStore()
    const { setLoading } = loadingStore

    setLoading(true)
    const user = JSON.parse(await localStorage.getItem('hyUser') || 'null')

    // do something before request is sent
    if (user) {
    // 看狀況這邊是不用加上 Bearer 其他可能還是要
      config.headers.Authorization = `Bearer ${user.apiToken}`
    } else {
      router.push('/login')
    }
    return config
  },
  (error) => {
    const loadingStore = useLoadingStore()
    const { setLoading } = loadingStore
    setLoading(false)
    // do something with request error
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async (response) => {
    const loadingStore = useLoadingStore()
    const { setLoading } = loadingStore
    setLoading(false)

    const res = response.data
    const status = response.status
    // if the custom code is not 200, it is judged as an error.
    if (status !== 201 && status !== 200) {
      // do something

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      const userStore = useUserStore()
      const { setId, setName, setRole } = userStore
      const user = JSON.parse(await localStorage.getItem('hyUser') || 'null')
      if (user) {
        setId(user.id)
        setName(user.name)
        setRole(user.role)
      }
      return response
    }
  },
  (error) => {
    const loadingStore = useLoadingStore()
    const { setLoading } = loadingStore
    setLoading(false)
    console.error('err' + error) // for debug
    if (error.request?.status === 401) {
      localStorage.removeItem('hyUser')
      router.push('/login')
    }
    // do something
    return Promise.reject(error)
  }
)

export { service }
