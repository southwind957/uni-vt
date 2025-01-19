<template>
  <view class="flex">
    <view class="color-red">{{ title }}</view>
    <view class="title">{{ title }}</view>
    <wd-button type="success">主要按钮</wd-button>
  </view>
  <wd-icon name="add-circle" />
  <wd-tag custom-class="space">标签</wd-tag>
  <wd-tag custom-class="space" type="primary">标签</wd-tag>
  <wd-tag custom-class="space" type="danger">标签</wd-tag>
  <wd-tag custom-class="space" type="warning">标签</wd-tag>
  <wd-tag custom-class="space" type="success">标签</wd-tag>
  <wd-watermark content="uni-vt" :width="130" :height="130"></wd-watermark>
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
