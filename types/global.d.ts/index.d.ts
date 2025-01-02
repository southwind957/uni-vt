//  请求参数
interface netWork {
  url: string
  data?: object
  method: 'GET' | 'POST'
  header?: object
}

// 响应参数
interface IResponse<T = any> {
  code: number
  data: T
  message?: string
}

// 列表参数
interface IList<T> {
  list: T[]
  total: number
}
