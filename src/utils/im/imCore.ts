import { bus } from '../event/eventBus'
import { ref } from 'vue'

export interface IMOptions {
  url: string
  userId: string
  token?: string
}

// 改为在函数调用时注册事件监听
export function createIM(options: IMOptions) {
  const status = ref<'未连接' | '连接中' | '已连接' | '已关闭' | '连接错误'>(
    '未连接'
  )
  let ws: UniApp.SocketTask | null = null

  // 初始化事件监听
  function initEventListeners() {
    console.log('[IM] 初始化事件监听器')

    // 监听连接请求
    bus.on('im:conn', (config) => {
      console.log('[IM] 收到连接请求:', config)
      connect(config)
    })

    // 监听消息发送
    bus.on('chat:send', (msg) => {
      console.log('[IM] 收到发送消息请求:', msg)
      if (!ws) {
        console.warn('[IM] 未连接无法发送')
        return
      }
      ws.send({ data: JSON.stringify(msg) })
    })
  }

  function connect(config?: IMOptions) {
    status.value = '连接中'
    console.log('[IM] 开始连接...')

    const connectUrl = config?.url || options.url
    ws = uni.connectSocket({
      url: connectUrl,
      success() {
        console.log('[IM] 连接请求已发送:', connectUrl)
      },
      fail(err) {
        console.error('[IM] 连接失败:', err)
        status.value = '连接错误'
      }
    })

    if (!ws) {
      console.error('[IM] 创建 WebSocket 失败')
      return
    }

    ws.onOpen(() => {
      status.value = '已连接'
      console.log('[IM] WebSocket 已连接')

      // 发送认证消息
      ws?.send({
        data: JSON.stringify({
          type: 'auth',
          userId: config?.userId || options.userId,
          token: config?.token || options.token
        })
      })
    })

    ws.onMessage((res) => {
      console.log('[IM] 收到原始消息:', res.data)
      try {
        const payload = JSON.parse(res.data)
        console.log('[IM] 解析后的消息:', payload)

        // 广播所有消息
        bus.emit('im:recv', payload)

        // 特定类型消息单独广播
        if (payload.type === 'chat') {
          bus.emit('chat:recv', payload)
        }
      } catch (e) {
        console.error('[IM] 消息解析失败:', e)
      }
    })

    ws.onClose(() => {
      status.value = '已关闭'
      console.log('[IM] WebSocket 已关闭')
      bus.emit('im:close')
    })

    ws.onError((err) => {
      status.value = '连接错误'
      console.error('[IM] WebSocket 错误:', err)
      bus.emit('im:error', err)
    })
  }

  // 立即初始化事件监听
  initEventListeners()

  return {
    status,
    connect
  }
}
