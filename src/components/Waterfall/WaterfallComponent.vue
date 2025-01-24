<template>
  <view class="water-app">
    <view
      class="mr-10rpx"
      :style="{ width: width + '%' }"
      v-for="(item, index) in cloumnData"
      :key="index"
    >
      <slot name="display" :Idata="item"></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue'
// 多列情况下，需要开发者把数据交给组件，因为让开发者写三四个插槽很麻烦
const prpos = defineProps({
  data: {
    type: Array<IWaterfall>,
    required: true
  },
  column: {
    type: Number,
    default: 2
  },
  gap: {
    type: Number,
    default: 10
  }
})

const cloumnData = ref<IWaterfall[][]>([])

// 计算宽度
const width = computed(() => {
  // 取整: 宽度为100% / 列数
  return Math.round(100 / prpos.column)
})

// 切分数组,将数组data按照column进行分组
const initData = (size: number) => {
  const result: IWaterfall[][] = Array.from({ length: size }, () => [])
  prpos.data.forEach((item, index) => {
    result[index % size].push(item)
  })
  cloumnData.value = result
}

onMounted(() => {
  initData(prpos.column)
})
</script>

<style lang="scss" scoped>
.water-app {
  display: flex;
  :last-child {
    margin-right: 0;
  }
}
</style>
