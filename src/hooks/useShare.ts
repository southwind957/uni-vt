import { reactive } from 'vue'

// 全局响应式分享配置
export const shareConfig = reactive({
  title: 'IP数字化运营平台',
  path: '/pages/home/home',
  imageUrl: ''
})

// 默认分享封面（可选）
export const shareCover = '这里可以放分享的封面图'

// 提供修改配置的方法
export function setShareConfig(config: any) {
  Object.assign(shareConfig, config)
}

export default {
  onShareAppMessage() {
    return {
      ...shareConfig,
      imageUrl: shareConfig.imageUrl || shareCover // 优先使用配置的封面
    }
  }
}
