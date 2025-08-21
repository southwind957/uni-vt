import { createAlova } from 'alova'
import uniappAdapter from '@alova/adapter-uniapp'
import { decrypt, encrypt } from './crypto'

const BASE_URL = import.meta.env.VITE_APP_URL

export const alovaInst = createAlova({
  baseURL: BASE_URL,
  timeout: 15000,
  ...uniappAdapter(),
  beforeRequest: (method) => {
    console.log('method', method)

    // 这里可以统一设置 token
    const token = uni.getStorageSync('token')
    if (token) {
      method.config.headers = {
        ...method.config.headers,
        Authorization: `Bearer ${token}`
      }
    }

    // 接口加密
    if (method.config.params || method.data) {
      if (method.type === 'GET') {
        method.config.params = encrypt(method.config.params)
      } else {
        method.data = encrypt(method.data)
      }
    }
  },
  responded: {
    onSuccess: (response: any) => {
      // response 是 uniapp 的 response
      const { data } = response

      if (data.code !== 200) {
        uni.showToast({ title: data.message || '请求失败', icon: 'none' })
        throw new Error(data.message)
      }
      return decrypt(data)
    },
    onError: (err) => {
      uni.showToast({ title: '网络错误', icon: 'none' })
      throw err
    }
  }
})
