// 这里需要对表单数据进行控制
// 1. 接管表单数据
// 2. 暴露方法修改表单数据
// 3. 暴露方法获取表单数据
import { ref, readonly } from 'vue'
import { deepClone } from 'wot-design-uni/components/common/util'

type Cloneable = object | any[] | Date | RegExp | number | string | boolean

export function useForm<T extends Cloneable>() {
  const formData = ref<T>({} as T)

  /**
   * 初始化表单数据
   * @param initialData 初始数据
   */
  const initForm = (initialData: T) => {
    formData.value = deepClone(initialData)
  }

  /**
   * 设置表单字段值（支持深层次设置）
   * @param path 字段路径（支持点语法）
   * @param value 要设置的值
   * Example: setFormField('user.address.street', 'Main St')
   */
  const setFormField = <K extends keyof T>(
    path: string | K,
    value: Cloneable
  ) => {
    const paths = String(path).split('.')
    const lastKey = paths.pop() as keyof object
    const target = paths.reduce((obj, key) => obj[key], formData.value as any)

    if (target && lastKey) {
      target[lastKey] = value
    }
  }

  /**
   * 获取当前表单数据（返回深拷贝）
   */
  const getFormData = (): T => {
    return deepClone(formData.value)
  }

  return {
    /** 只读的表单数据（响应式） */
    formData: readonly(formData),
    /** 初始化表单方法 */
    initForm,
    /** 设置字段值方法 */
    setFormField,
    /** 获取表单数据方法 */
    getFormData
  }
}
