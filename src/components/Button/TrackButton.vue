<template>
  <!-- #ifdef APP-PLUS || H5 -->
  <wd-button v-bind="$attrs" @click="handleClick">
    <slot />
  </wd-button>
  <!-- #endif -->
  <!-- #ifdef MP-WEIXIN -->
  <wd-button v-bind="$attrs" @tap="handleClick">
    <slot />
  </wd-button>
  <!-- #endif -->
</template>

<script setup lang="ts">
import { tracks } from '@/utils'
/**
 * Props
 */
interface Props {
  event: string // 埋点事件名，必填
  params?: Record<string, any> // 埋点参数，可选
  disabled?: boolean // 禁用埋点
  once?: boolean // 只上报一次
  throttle?: number // 节流(ms)
  debounce?: number // 防抖(ms)
}

const props = withDefaults(defineProps<Props>(), {
  params: () => ({}),
  disabled: false,
  once: false,
  throttle: 0,
  debounce: 0
})

const emit = defineEmits<{
  (e: 'click', evt: any): void
}>()

let fired = false
let timer: any = null
let last = 0

function handleClick(e: any) {
  // 始终先触发业务 click
  emit('click', e)

  if (props.disabled || !props.event) return
  if (props.once && fired) return

  // --- 节流处理 ---
  if (props.throttle > 0) {
    const now = Date.now()
    if (now - last < props.throttle) return
    last = now
  }

  // --- 防抖处理 ---
  if (props.debounce > 0) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      tracks.track(props.event, props.params)
    }, props.debounce)
    return
  }

  // --- 正常埋点 ---
  tracks.track(props.event, props.params)
  if (props.once) fired = true
}
</script>
