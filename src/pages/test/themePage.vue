<template>
  <view :class="themeClass" class="theme-container">
    <view class="btn" @click="toggleTheme">切换主题</view>
    <view class="card">测试主题色</view>
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app'
import { computed } from 'vue'
import useStore from '@/store/index'
import { changeNavaBar } from '@/utils/unifunc'

const themeStore = useStore().useTheme
const themeClass = computed(() => {
  return themeStore.theme
})

const toggleTheme = () => {
  themeStore.toggleTheme()
}

onShow(() => {
  changeNavaBar(themeStore.theme)
})
</script>

<style lang="scss" scoped>
.theme-container {
  width: 100vw;
  height: 100vh;
  background-color: var(--page-bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  // width: 60%;
  padding: 20rpx;
  background-color: var(--main-color);
  border-radius: 12rpx;
  color: var(--page-bg-color);
}

.card {
  width: 100%;
  height: 400rpx;
  margin-top: 20rpx;
  padding: 30rpx;
  background-color: var(--main-color);
  color: var(--page-bg-color);
}
</style>
