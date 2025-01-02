import { Toast } from '@/utils/unifunc'
import { whiteList } from './config'
import { encrypt, decrypt } from './crypto'
import { isEmpty, isWhiteList } from '@/utils/others'

const baseUrl = import.meta.env.VITE_APP_URL
// const env = import.meta.env.VITE_APP_ENV

// 请求拦截器
const requestInterceptor = (params: netWork): netWork => {
  const config = {
    url: baseUrl + params.url,
    data: params.data,
    method: params.method,
    header: { 'content-type': 'application/json' }
  }
  if (!isWhiteList(whiteList, params.url) && !isEmpty(params.data)) {
    config.data =
      typeof encrypt(params.data as string | object) === 'string'
        ? { param: encrypt(params.data as string | object) }
        : params.data
  }
  return config
}

// 响应拦截器
const responseInterceptor = (res: any): IResponse => {
  if (typeof res === 'object' && res?.code === 200) {
    const plain = decrypt(res.data)
    const ans = {
      code: res.code,
      data: plain,
      message: res?.message as string
    }
    return ans
  } else {
    Toast(res.message, 'error')
    const ans = {
      code: 100,
      data: {},
      message: '返回值错误'
    }
    return ans
  }
}

/**
 * @description: 网络请求
 * @param {netWork} params
 * @return {Promise}
 */
const request = (params: netWork): Promise<IResponse> => {
  const config = requestInterceptor(params)
  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      success: (res) => {
        const ans = res.data as Response
        resolve(responseInterceptor(ans))
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

class Request {
  //  get请求，使用泛型封装
  public get<T>(url: string, data?: object): Promise<IResponse<T>> {
    return request({ url, data, method: 'GET' })
  }
  //  post请求，使用泛型封装
  public post<T>(url: string, data?: object): Promise<IResponse<T>> {
    return request({ url, data, method: 'POST' })
  }
}
export default new Request()
