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
        <div v-for="(item, index) in items" :key="`${catIndex}-${index}`">
          <wd-input
            v-if="item.type === 'Input'"
            :label="item.label"
            label-width="100px"
            show-word-limit
            :prop="item.field"
            suffix-icon="warn-bold"
            clearable
            v-model="formData[item.field]"
            :placeholder="`请输入${item.label}`"
          />
          <wd-input
            v-if="item.type === 'Password'"
            :label="item.label"
            label-width="100px"
            show-word-limit
            :prop="item.field"
            suffix-icon="warn-bold"
            type="password"
            clearable
            v-model="formData[item.field]"
            :placeholder="`请输入${item.label}`"
          />
          <wd-cell
            :title="item.label"
            title-width="100px"
            v-if="item.type === 'Number'"
          >
            <view style="text-align: left">
              <wd-input-number v-model="formData[item.field]" />
            </view>
          </wd-cell>
        </div>
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

const formData = ref<Record<string, any>>({})

const schemaList = groupBy(props.formSchema, (item) => item.cell as string)

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
