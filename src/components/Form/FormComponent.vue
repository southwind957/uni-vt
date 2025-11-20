<template>
  <view>
    <wd-form ref="form" :rules="props.rules">
      <wd-cell-group
        custom-class="group"
        :title="category"
        border
        v-for="([category, items], catIndex) in Object.entries(schemaList)"
        :key="catIndex"
      >
        <template v-for="(item, index) in items" :key="`${catIndex}-${index}`">
          <component
            :is="componentsMap[item.type]"
            v-bind="getComponentProps(item)"
            v-model="formData[item.field]"
          />
        </template>
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
import { ref, type PropType, onMounted } from 'vue'
import { groupBy } from '@/utils/others'

const emit = defineEmits(['register', 'submitForm'])

// 用于请求的数组
const requestList = ref<string[]>([])
// 保留原数组，为了兼容wot-design的picker组件,泛型为T
const originalFormSchema = ref<originPicker[]>([])

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

const schemaList = groupBy(props.formSchema, (item) => item.cell as string)

// 组件映射
const componentsMap: Record<string, any> = {
  Input: 'wd-input',
  Password: 'wd-input',
  Number: 'wd-input-number',
  Picker: 'wd-picker',
  InputAddress: 'wd-input',
  Checkbox: 'wd-checkbox',
  Rate: 'wd-rate',
  Switch: 'wd-switch',
  Sign: 'wd-signature'
}

// 根据组件映射构造相应的props
const getComponentProps = <T extends baseOption>(item: IFormSchema<T>) => {
  if (
    item.type === 'Input' ||
    item.type === 'Password' ||
    item.type === 'InputAddress'
  ) {
    const componentProps = {
      'show-word-limit': true,
      prop: item.field,
      'suffix-icon': item.type === 'InputAddress' ? 'location' : undefined,
      clearable: true,
      type: item.type === 'Password' ? 'password' : 'text',
      placeholder: `请输入${item.label}`
    }
    return componentProps
  }
  if (
    item.type === 'Number' &&
    item.formItemProps &&
    'min' in item.formItemProps
  ) {
    const numberProps = item.formItemProps as INumberProps
    const componentProps = {
      min: numberProps?.min || 0,
      max: numberProps?.max || 100,
      step: numberProps?.step || 1
    }
    return componentProps
  }
  if (item.type === 'Picker' && item.formItemProps) {
    // 类型断言为pickerProps
    const pickerProps = item.formItemProps
    // 在此之前，接收一下传入的数据，如果未传就请求一下数据
    if (pickerProps && 'options' in pickerProps && !pickerProps.options) {
      // 类型断言为string[]，如果未传就默认空数组,因为传递要求就是字符串数组
      requestList.value = pickerProps?.options ?? []
    }
    // 如果有api，就请求一下数据
    if (pickerProps && 'optionApi' in pickerProps && pickerProps.optionApi) {
      pickerProps.optionApi().then((res) => {
        // 类型断言为T[]，如果未传就默认空数组,因为传递要求就是字符串数组
        requestList.value = res.map((item) => item.name)
        // 保留原数组，为了兼容wot-design的picker组件
        originalFormSchema.value = res
      })
    }
    const componentProps = {
      columns: requestList.value
    }
    return componentProps
  }
}

const submitForm = () => {
  emit('submitForm', formData.value)
}

onMounted(() => {
  props.formSchema.forEach((item) => {
    formData.value[item.field] = ''
  })
  emit('register', formData.value)
})
</script>

<style lang="scss" scoped>
.footer {
  padding: 12px;
}
</style>
