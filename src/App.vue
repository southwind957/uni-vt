<template>
  <view :class="themeStore.theme">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import useStore from '@/store/index'
import { createIM } from '@/utils/im/imCore'

const im = createIM({
  url: import.meta.env.VITE_APP_AI_IMG_URL,
  userId: 'userA'
})

const { connect } = im

const themeStore = useStore().useTheme
onLaunch(() => {
  connect()
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss"></style>
