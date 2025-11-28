<template>
  <view>
    <wd-form ref="form" :rules="props.rules" :model="formData">
      <wd-cell-group
        custom-class="group"
        :title="category"
        border
        v-for="([category, items], catIndex) in Object.entries(schemaList)"
        :key="catIndex"
      >
        <wd-cell
          :title="item.label"
          title-width="100px"
          v-for="item in items"
          :key="`${catIndex}-${item.field}`"
        >
          <wd-input
            v-if="item.type === 'Input'"
            show-word-limit
            :prop="item.field"
            suffix-icon="warn-bold"
            clearable
            v-model="formData[item.field]"
            :placeholder="`请输入${item.label}`"
          />
          <wd-input
            v-if="item.type === 'InputAddress'"
            show-word-limit
            :prop="item.field"
            suffix-icon="location"
            v-model="formData[item.field]"
            :placeholder="`请输入${item.label}`"
            @click="selectAddress(item)"
          />
          <wd-input
            v-if="item.type === 'Password'"
            show-word-limit
            :prop="item.field"
            suffix-icon="warn-bold"
            type="password"
            clearable
            v-model="formData[item.field]"
            :placeholder="`请输入${item.label}`"
          />
          <wd-input-number
            v-if="item.type === 'Number'"
            v-model="formData[item.field]"
          />
          <wd-picker
            v-if="item.type === 'Picker'"
            :columns="getNames(item as IFormSchema<'Picker'>)"
            v-model="formData[item.field]"
          />
          <wd-textarea
            v-if="item.type === 'Textarea'"
            v-model="formData[item.field]"
            :placeholder="`请输入${item.label}`"
          />
          <wd-rate
            v-if="item.type === 'Rate'"
            :icon="
              hasKeys(item.formItemProps, ['icon'])
                ? item.formItemProps.icon
                : 'star'
            "
            :active-color="
              hasKeys(item.formItemProps, ['activeColor'])
                ? item.formItemProps.activeColor
                : 'red'
            "
            v-model="formData[item.field]"
          />
          <wd-switch
            :active-color="
              hasKeys(item.formItemProps, ['activeColor'])
                ? item.formItemProps.activeColor
                : 'red'
            "
            :inactive-color="
              hasKeys(item.formItemProps, ['inactiveColor'])
                ? item.formItemProps.inactiveColor
                : 'gray'
            "
            v-if="item.type === 'Switch'"
            v-model="formData[item.field]"
          />
          <wd-signature
            v-if="item.type === 'Sign'"
            :export-scale="
              hasKeys(item.formItemProps, ['exportScale'])
                ? item.formItemProps.exportScale
                : 2
            "
            :background-color="
              hasKeys(item.formItemProps, ['backgroundColor'])
                ? item.formItemProps.backgroundColor
                : '#ffffff'
            "
            pressure
            enable-history
            :height="200"
            :min-width="1"
            :max-width="6"
            @confirm="confirmSign"
            @clear="clearSign"
          />
        </wd-cell>
      </wd-cell-group>
      <wd-cell title-width="0px">
        <view>
          <wd-button type="primary" @click="submitForm">提交</wd-button>
        </view>
      </wd-cell>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { ref, type PropType, onMounted, computed } from 'vue'
import { groupBy } from '@/utils/others'
import { hasKeys } from '@/utils/typeFunc'
import { uploadFile } from '@/utils/unifunc'

const emit = defineEmits(['register', 'submitForm'])

// 每个field单独保存
const pickerNames = ref<Record<string, string[]>>({})
// 保留原数组，为了兼容wot-design的picker组件,泛型为T
const originalRaw = ref<Record<string, originPicker[]>>({})
// wot-design的签名组件图片
const img = ref<Partial<any>>({})

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

const formData = ref<FormDataType>({})

const schemaList = computed(() =>
  groupBy(props.formSchema, (item) => item.cell as string)
)

// 处理函数开始
// 选择
const getNames = (item: IFormSchema<'Picker'>) => {
  const field = item.field
  const formItem = item.formItemProps

  // 如果已经加载过,直接返回
  if (pickerNames.value[field]) {
    return pickerNames.value[field]
  }

  if (formItem?.options) {
    pickerNames.value[field] = formItem.options
    return pickerNames.value[field]
  }
  if (formItem?.optionApi) {
    pickerNames.value[field] = []
    // 先执行一下传递过来的请求
    formItem.optionApi().then((res: IResponse<IList<originPicker>>) => {
      originalRaw.value[field] = res.data.items
      //  处理一下options的格式, 为了兼容wot-design的picker组件
      pickerNames.value[field] = res.data.items.map((i) => i.name)
    })
    return pickerNames.value[field]
  }

  return []
}

// 签名
const confirmSign = async (result: any) => {
  if (result.success) {
    const res = await uploadFile(result.tempFilePath)
    if (res) {
      img.value = res
    }
  }
}

const clearSign = () => {
  img.value = {}
}

const selectAddress = (item: IFormSchema) => {
  uni.chooseLocation({
    success: (res) => {
      formData.value[item.field] = res.address
      formData.value['lat'] = res.latitude
      formData.value['lng'] = res.longitude
    }
  })
}

const submitForm = () => {
  for (const item of props.formSchema) {
    if (item.type === 'Sign') {
      formData.value[item.field] = img.value.url
    }
    if (item.type === 'Picker') {
      const raw = originalRaw.value[item.field] || []
      formData.value[item.field] = raw.find(
        (i) => i.name === formData.value[item.field]
      )?.id as number
    }
  }
  emit('submitForm', formData.value)
}

onMounted(() => {
  props.formSchema.forEach((item) => {
    formData.value[item.field] = ''
    if (item.type === 'Rate') {
      formData.value[item.field] = 1
    }
  })
  emit('register', formData.value)
})
</script>

<style lang="scss" scoped>
.footer {
  padding: 12px;
}
</style>
