import { createAlova } from 'alova'
import uniappAdapter from '@alova/adapter-uniapp'
import { decrypt, encrypt } from './crypto'

const BASE_URL = import.meta.env.VITE_APP_URL
// 再创建一个实例,无需加解密,用作AI请求
const BASE_AI_URL = import.meta.env.VITE_APP_AI_URL

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
      // TODO 这是适配GitHub/test的测试数据，由于没有code，记得删除
      const newdata = {
        code: 200,
        data: data
      }
      if (newdata.code !== 200) {
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

export const alovaAiInst = createAlova({
  baseURL: `${BASE_AI_URL}`,
  timeout: 15000,
  ...uniappAdapter(),
  beforeRequest: (method) => {
    console.log('method', method)

    method.config.headers = {
      ...method.config.headers,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_APP_AI_KEY}`
    }
  },
  responded: {
    onSuccess: (response: any) => {
      const { data } = response
      const message: AICommand = JSON.parse(data.answer)
      return message
    },
    onError: (err) => {
      console.log('err', err)
      uni.showToast({ title: '网络错误', icon: 'none' })
      throw err
    }
  }
})
