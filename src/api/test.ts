import Request from '@/request'

export const getTest = <T>(): Promise<IResponse<IList<T>>> => {
  return Request.get('/imgs')
}
