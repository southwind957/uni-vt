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
  <wd-watermark content="uni-vt" :width="130" :height="130"></wd-watermark>
  <!-- 自定义钩子 -->
  <view class="flex flex-col">
    <view class="mt-10rpx">
      <wd-button type="primary" @click="onInit">初始化</wd-button>
      <wd-button type="primary" @click="onSet">设置</wd-button>
      <wd-button type="primary" @click="onGet">获取</wd-button>
    </view>
    <view>
      表单数据
      <view>{{ formData }}</view>
    </view>
  </view>
  <!-- 瀑布流 -->
  <Waterfall
    class="mt-20rpx w-[96%] mx-auto"
    :data="waterfallData"
    :gap="10"
    v-if="waterfallData.length > 0"
  >
    <template #display="slotData">
      <view
        class="w-[94%] mb-10rpx rounded-14rpx shadow-[0px_0px_0px_0.1px_rgba(0,0,0,0.5)] p-10rpx"
        v-for="(item, index) in slotData.Idata"
        :key="index"
      >
        <image class="w-[100%] rounded-14rpx" :src="item.url" mode="widthFix" />
        <view>
          <view class="flex items-center space-x-4">
            <wd-img :width="30" :height="30" round :src="item.avator" />
            <view class="mt-10rpx">{{ item.name }}</view>
          </view>
          <view class="text-left">{{ item.content }}</view>
        </view>
      </view>
    </template>
  </Waterfall>
  <From :rules="rules" class="mt-20rpx" />
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import useStore from '@/store/index'
import { getWaterfall } from '@/api/test'
// 引入瀑布流组件
import Waterfall from '@/components/Waterfall/WaterfallComponent.vue'
import From from '@/components/Form/FormComponent.vue'
// 引入自定义hooks
import { useForm } from '@/hooks/useForm'
import { useValidateRule } from '@/hooks/useValidate'
// 引入常用正则
import * as pattern from '@/utils/pattern'

const { useSafeArea } = useStore()
console.log('========>', useSafeArea.getSafeAreaTop)

const title = ref('uni-vt')

// 瀑布流的数据
const waterfallData = ref<IWaterfall[]>([])

// 表单hooks
type IFormData = {
  name: string
  password: string
}

const formData = computed(() => getFormData())

const { initForm, setFormField, getFormData } = useForm<IFormData>()

// 规则钩子
const { Rule } = useValidateRule()

const onInit = () => {
  initForm({
    name: 'test',
    password: '123456'
  })
}

const rules = Rule([
  { field: 'name' },
  {
    message: '请输入正确手机号',
    checkType: 'RegExp',
    field: 'phone',
    pattern: pattern.mobileRegex
  }
])

const onSet = () => {
  setFormField('name', 'uni-vt')
}

const onGet = () => {
  console.log('🚀 ~ onGet ~ getFormData():', getFormData())
}

function showPaging() {
  uni.navigateTo({ url: '/pages/my/myPage' })
}

onLoad(async () => {
  const res = await getWaterfall<IWaterfall>()
  waterfallData.value = res.data.items
})
</script>

<style lang="scss" scoped>
.title {
  color: $thme-color;
  font-size: 40rpx;
}
</style>
