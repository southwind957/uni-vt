<template>
  <view>
    <up-popup :show="show" @close="close" mode="center">
      <view>
        <text>出淤泥而不染，濯清涟而不妖</text>
      </view>
    </up-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getTest } from '@/api/test'
import { onShow } from '@dcloudio/uni-app'
import type { Test } from '@/types/test'

// 创建响应式数据
const show = ref(true)
const imgList = ref<Test>()
function close() {
  show.value = false
}
const getData = async () => {
  const res = await getTest()
  imgList.value = res.data
  console.log('🚀 ~ getData ~ imgList.value :', imgList.value)
}

onShow(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
