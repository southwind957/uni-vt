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
      <wd-button type="primary" @click="handleDownload">下载页面</wd-button>
      <wd-button type="primary" @click="onInit">初始化</wd-button>
      <wd-button type="primary" @click="onSet">设置</wd-button>
      <wd-button type="primary" @click="onGet">获取</wd-button>
      <wd-button open-type="share">分享给好友</wd-button>
      <wd-button @click="handleMap">获取位置</wd-button>
      <wd-button @click="handleTomap">导航到获取的位置</wd-button>
    </view>
    <view class="mb-10">
      <view>当前位置：</view>
      <view>经度：{{ longitude }}</view>
      <view>纬度：{{ latitude }}</view>
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
  <From
    :rules="rules"
    :formSchema="schema"
    class="mt-20rpx"
    @register="register"
    @submitForm="submitForm"
  />
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

import { setShareConfig } from '@/hooks/useShare'

const { useSafeArea } = useStore()
console.log('========>', useSafeArea.getSafeAreaTop)

const title = ref('uni-vt')

const longitude = ref<number>(0)
const latitude = ref<number>(0)

const handleMap = () => {
  uni.chooseLocation({
    success: function (res) {
      console.log('位置名称：' + res.name)
      console.log('详细地址：' + res.address)
      console.log('纬度：' + res.latitude)
      console.log('经度：' + res.longitude)
      longitude.value = res.longitude
      latitude.value = res.latitude
    }
  })
}

const handleTomap = () => {
  uni.openLocation({
    longitude: Number(longitude.value),
    latitude: Number(latitude.value),
    name: '当前位置',
    address: '详细地址'
  })
}

// 瀑布流的数据
const waterfallData = ref<IWaterfall[]>([])

// 表单hooks
type IFormData = {
  name: string
  password: string
  phone: string
  price: number
}

const formData = computed(() => getFormData())

const { initForm, setFormField, getFormData } = useForm<IFormData>()

// 规则钩子
const { Rule } = useValidateRule()

// 表单结构
const schema = ref<IFormSchema[]>([
  {
    field: 'name',
    label: '用户名',
    type: 'Input',
    placeholder: '请输入用户名',
    cell: '基础数据'
  },
  {
    field: 'password',
    label: '密码',
    type: 'Password',
    placeholder: '请输入密码',
    cell: '基础数据'
  },
  {
    field: 'phone',
    label: '手机号',
    type: 'Input',
    placeholder: '请输入手机号',
    cell: '扩展数据'
  },
  {
    field: 'price',
    label: '价格',
    type: 'Number',
    placeholder: '请输入价格',
    cell: '扩展数据'
  }
])

const register = (e: any) => {
  console.log('🚀 ~ register ~ e:', e)
  initForm(e)
}

const handleDownload = () => {
  uni.navigateTo({ url: '/pages/test/testPage' })
}

const submitForm = (e: any) => {
  for (const key in e) {
    setFormField(key, e[key])
  }
  console.log(getFormData())
}

const onInit = () => {
  initForm({
    name: 'test',
    password: '123456',
    phone: '12345678901',
    price: 100
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
  setShareConfig({
    title: '测试独立页面标题',
    path: '/pages/index/homePage',
    imageUrl: 'https://www.quazero.com/uploads/allimg/140303/1-140303215009.jpg'
  })
})
</script>

<style lang="scss" scoped>
.title {
  color: $thme-color;
  font-size: 40rpx;
}
</style>
