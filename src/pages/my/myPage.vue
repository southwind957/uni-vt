<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList">
    <view
      class="h-[200rpx] flex items-center justify-center"
      v-for="(item, index) in dataList"
      :key="index"
    >
      <view class="item-title">{{ item?.title }}</view>
    </view>
  </z-paging>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const paging = ref(null)

interface DataItem {
  title: string
  value: string
}

const dataList = ref<DataItem[]>([])

const queryList = (pageNo: number, pageSize: number) => {
  console.log('pageNo', pageNo)
  console.log('pageSize', pageSize)
  // 循环十次
  setTimeout(() => {
    let data = new Array(20).fill({ title: '测试数据', value: '测试值' })
    paging.value?.complete(data)
  })
}
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
