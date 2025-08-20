import { alovaInst } from '@/request'

export const getItems = () => {
  return alovaInst.Get<IResponse<number[]>>('/users', {
    params: {
      page: 1,
      pageSize: 10
    }
  })
}

export const PostItems = () => {
  return alovaInst.Post<IResponse<number[]>>('/users', {
    username: 'test',
    password: '123456'
  })
}
