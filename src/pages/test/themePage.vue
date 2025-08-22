<template>
  <view :class="theme">
    <view class="btn" @click="toggleTheme">切换主题</view>
    <view class="card">测试主题色</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const theme = ref('theme-a')

const toggleTheme = () => {
  theme.value = theme.value === 'theme-a' ? 'theme-b' : 'theme-a'
}
</script>

<style lang="scss" scoped>
.btn {
  padding: 20rpx;
  background-color: var(--main-color);
  color: #fff;
}

.card {
  margin-top: 20rpx;
  padding: 30rpx;
  border-radius: 12rpx;
  background-color: var(--main-color);
  color: #fff;
}
</style>
