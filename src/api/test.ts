import { alovaInst, alovaAiInst } from '@/request'

export const getItems = () => {
  return alovaInst.Get<any[]>('/v1/images/search', {
    params: {
      limit: 10
    }
  })
}

export const PostItems = () => {
  return alovaInst.Post<IResponse<number[]>>('/users', {
    username: 'test',
    password: '123456'
  })
}

export const PostItemsAi = (text: string) => {
  return alovaAiInst.Post<any>('/chat/completions', {
    text
  })
}
