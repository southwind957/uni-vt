<template>
  <view class="flex flex-col h-screen">
    <view v-if="$slots.top" class="flex-none">
      <slot name="top"></slot>
    </view>

    <view class="flex-1 flex relative overflow-hidden">
      <Transition name="slide-left">
        <view v-if="showSide && sidePosition === 'left'" class="flex-none">
          <slot name="side"></slot>
        </view>
      </Transition>

      <view class="flex-1 overflow-auto">
        <slot></slot>
      </view>

      <Transition name="slide-right">
        <view v-if="showSide && sidePosition === 'right'" class="flex-none">
          <slot name="side"></slot>
        </view>
      </Transition>
    </view>

    <view
      v-if="$slots.bottom"
      class="flex-none fixed bottom-0 left-0 right-0 z-10"
    >
      <slot name="bottom"></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showSide = ref(true)
const sidePosition = ref<'left' | 'right'>('left')

function toggleSide() {
  sidePosition.value = sidePosition.value === 'left' ? 'right' : 'left'
}

defineExpose({ toggleSide, showSide, sidePosition })

defineSlots<{
  top?: () => any
  bottom?: () => any
  side?: () => any
  default?: () => any
}>()
</script>

<style scoped>
/* 左侧动画 */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* 右侧动画 */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
