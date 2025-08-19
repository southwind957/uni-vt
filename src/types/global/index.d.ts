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
  items: T[]
  total: number
}

// 非零整数
type Int<N extends number> = `${N}` extends `${string}.${string}`
  ? never
  : 0 extends N
    ? never
    : N
