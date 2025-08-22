<template>
  <Layout ref="layoutRef">
    <template #side>
      <view class="w-[30vw] h-[100vh] bg-[#3ee0dd] text-white"
        >这里是侧边栏</view
      >
    </template>

    <template #bottom>
      <view
        class="w-[100%] h-[100rpx] bg-[#b293c8] flex items-center justify-center text-white"
        >底部固定栏</view
      >
    </template>

    <view class="text-lg">
      <p>这是内容区</p>
      <wd-button
        class="mt-4 px-3 py-1 bg-[#5acdd7] text-white rounded"
        @click="layoutRef?.toggleSide()"
      >
        切换侧边栏 ({{ layoutRef?.sidePosition }})
      </wd-button>
    </view>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Layout from '@/components/Layout/customLayout.vue'

const layoutRef = ref<InstanceType<typeof Layout> | null>(null)
</script>
