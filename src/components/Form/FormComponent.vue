<template>
  <view>
    <wd-form ref="form" :rules="props.rules"> </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

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

const schemaList = props.formSchema.groupby((item) => item.group)
console.log('🚀 ~ schemaList:', schemaList)
</script>

<style lang="scss" scoped>
.footer {
  padding: 12px;
}
</style>
