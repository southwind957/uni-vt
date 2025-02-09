<template>
  <view>
    <wd-form ref="form" :rules="props.rules"> </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { type PropType } from 'vue'
import { groupBy } from '@/utils/others'

// 动态接收参数，配合钩子进行数据控制
const props = defineProps({
  rules: {
    type: Object,
    required: true
  },
  formSchema: {
    type: Array as PropType<IFormSchema[]>,
    required: true
  }
})

const schemaList = groupBy(props.formSchema, (item) => item.cell as string)
console.log('🚀 ~ schemaList:', schemaList)
</script>

<style lang="scss" scoped>
.footer {
  padding: 12px;
}
</style>
