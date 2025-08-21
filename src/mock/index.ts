import mockData from './index.mock'

export const mockResponseHandler = () => {
  return {
    // 模拟延迟
    response: (data: any) =>
      new Promise((resolve) => setTimeout(() => resolve(data), 500)),
    // 错误模拟
    onError: (err: Error) => {
      console.error('Mock error:', err)
      return { code: -1, message: 'Mock request failed' }
    }
  }
}

export { mockData }
