<template>
  <view>
    <wd-form ref="form" :model="model" :rules="props.rules">
      <wd-cell-group border>
        <wd-input
          label="优惠券名称"
          label-width="100px"
          :maxlength="20"
          show-word-limit
          prop="couponName"
          required
          suffix-icon="warn-bold"
          clearable
          v-model="model.name"
          placeholder="请输入优惠券名称"
        />
        <wd-input
          label="歪比巴卜"
          label-width="100px"
          prop="phone"
          suffix-icon="camera"
          placeholder="请输入歪比巴卜"
          clearable
          v-model="model.phone"
        />
      </wd-cell-group>
      <view class="footer">
        <wd-button type="primary" size="large" @click="handleSubmit" block
          >提交</wd-button
        >
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

// 动态接收参数，配合钩子进行数据控制
const props = defineProps({
  rules: {
    type: Object,
    required: true
  }
})
// 统一使用规则
// ...
const model = reactive<{
  name: string
  phone: string
}>({
  name: '',
  phone: ''
})

const form = ref()

function handleSubmit() {
  console.log('🚀 ~ handleSubmit ~ form.value:', form.value.validate)
  form.value
    .validate()
    .then(({ valid, errors }) => {
      console.log('🚀 ~ .then ~ errors:', errors)
      if (valid) {
        uni.showToast({ title: '提交成功', icon: 'success' })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>

<style lang="scss" scoped>
.footer {
  padding: 12px;
}
</style>
