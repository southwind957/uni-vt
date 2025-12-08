import { alovaInst } from '@/request'

export const trackData = <T>(data: TrackPayload[]): Promise<IResponse<T>> => {
  console.log('trace data:', data)
  //   上报埋点
  return alovaInst.Post('/track', data)
}
