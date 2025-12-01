type Handler = (...args: any[]) => void

class EventBus {
  // 事件映射
  private eventMap: Map<string, Handler[]> = new Map()

  // 订阅事件
  on(event: string, handler: Handler) {
    console.log('订阅事件:', event, handler)

    const handlers = this.eventMap.get(event) || []
    handlers.push(handler)
    this.eventMap.set(event, handlers)
    return () => this.off(event, handler)
  }

  // 取消订阅事件
  off(event: string, handler: Handler) {
    const handlers = this.eventMap.get(event) || []
    this.eventMap.set(
      event,
      handlers.filter((h) => h !== handler)
    )
  }

  // 触发事件
  emit(event: string, ...args: any[]) {
    const handlers = this.eventMap.get(event) || []
    handlers.forEach((handler) => handler(...args))
  }
}

export const bus = new EventBus()
