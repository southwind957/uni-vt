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
  return alovaAiInst.Post<any>('/chat-messages', {
    query: text,
    response_mode: 'blocking',
    user: 'test-user',
    inputs: {},
    files: []
  })
}

// 返回测试数据，不用请求，直接promise模拟
export const getTestData = () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve({
        statusCode: 200,
        data: {
          items: [
            {
              id: 1,
              name: '男'
            },
            {
              id: 2,
              name: '女'
            }
          ]
        }
      })
    }, 1000)
  })
}
