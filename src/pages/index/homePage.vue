<template>
  <view class="flex">
    <view class="color-red">{{ title }}</view>
    <view class="title">{{ title }}</view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const title = ref('标记点')
</script>

<style lang="scss" scoped>
.title {
  color: #1717be;
  font-size: 40rpx;
}
</style>
