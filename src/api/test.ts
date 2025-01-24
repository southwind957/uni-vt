import Request from '@/request'

export const getTest = <T>(): Promise<IResponse<IList<T>>> => {
  return Request.get('/imgs')
}

export const TestMock = <T>(): Promise<IResponse<T>> => {
  return Request.get('/mock/test')
}

export const getWaterfall = <T>(): Promise<IResponse<IList<T>>> => {
  return Request.get('/mock/waterfall')
}
