<template>
  <view class="pt-10rpx">
    <view class="color-blue">{{ title }}</view>
    <view class="title">{{ title }}</view>
    <wd-button type="success" @click="showPaging">主要按钮</wd-button>
  </view>
  <!-- 图标预设 -->
  <view class="i-carbon-sun dark:i-carbon-moon color-blue mb-20rpx"></view>
  <wd-icon name="add-circle" />
  <wd-tag custom-class="space">标签</wd-tag>
  <wd-tag custom-class="space" type="primary">标签</wd-tag>
  <wd-tag custom-class="space" type="danger">标签</wd-tag>
  <wd-tag custom-class="space" type="warning">标签</wd-tag>
  <wd-tag custom-class="space" type="success">标签</wd-tag>
  <wd-watermark content="uni-vt" :width="130" :height="130"></wd-watermark>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import useStore from '@/store/index'
import { TestMock } from '@/api/test'

const { useSafeArea } = useStore()
console.log('========>', useSafeArea.getSafeAreaTop)

const title = ref('标记点')

function showPaging() {
  uni.navigateTo({ url: '/pages/my/myPage' })
}

onMounted(async () => {
  const res = await TestMock<{ name: string }>()
  title.value = res.data.name
})
</script>

<style lang="scss" scoped>
.title {
  color: $thme-color;
  font-size: 40rpx;
}
</style>
