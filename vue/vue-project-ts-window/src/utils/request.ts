import router from '@/router'
import { useUserStore } from '@/stores'
import axios, { AxiosError, type AxiosRequestHeaders, type Method } from 'axios'
import { showToast } from 'vant'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    //添加 token
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      ;(config.headers as AxiosRequestHeaders).Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data.code !== 0) {
      showToast(response.data.message || '请求失败')
      return Promise.reject(response.data)
    }
    return response.data
  },
  (error: AxiosError) => {
    //处理401
    if (error.response?.status === 401) {
      //清楚本地用户信息
      const store = useUserStore()
      store.del()
      //跳转到登录页面
      router.push({
        path: '/login',
        query: { returnUrl: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject(error)
  }
)

type Data<T> = {
  code: number
  message: string
  data: T
}

const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  //现在不能再第一个参数设置泛型，只能再第二个参数设置 自定义的
  return instance.request<any, Data<T>>({
    url,
    method: method.toUpperCase(),
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}
export default request
