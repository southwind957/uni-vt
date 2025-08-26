<template>
  <view class="water-app">
    <view
      class="mr-10rpx"
      :style="{ width: width + '%' }"
      v-for="(item, index) in columnData"
      :key="index"
    >
      <slot name="display" :Idata="item"></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getMinIdx } from '@/utils/others'
import { computed, ref, onMounted, watch } from 'vue'
// 多列情况下，需要开发者把数据交给组件，因为让开发者写三四个插槽很麻烦
const props = defineProps({
  data: {
    type: Array<IWaterfall>,
    required: true
  },
  column: {
    type: Number,
    default: 2
  }
})

const columnData = ref<IWaterfall[][]>([])

// 计算宽度
const width = computed(() => {
  // 取整: 宽度为100% / 列数
  return Math.round(100 / props.column)
})

// 切分数组,将数组data按照column进行分组
const initData = (columnCount: number) => {
  const result: IWaterfall[][] = Array.from({ length: columnCount }, () => [])
  const heightArr = Array.from({ length: columnCount }, () => 0)
  props.data.forEach((item, index) => {
    if (index < columnCount) {
      result[index].push(item)
      heightArr[index] = item.height
    } else {
      const minHeight = getMinIdx(heightArr)
      result[minHeight].push(item)
      heightArr[minHeight] += item.height
    }
  })
  columnData.value = result
}

// 监听列数变化
watch(
  () => props.column,
  (newVal) => initData(newVal)
)
// 监听数据变化（需根据业务需求决定是否深度监听）
watch(
  () => props.data,
  (newData) => {
    console.log('🚀 ~ watch ~ newData:', newData)
    initData(props.column)
  }
)

onMounted(() => {
  initData(props.column)
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
