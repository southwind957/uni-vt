type FormDataType = {
  [key in string]: string | number
}

interface originPicker {
  id: number
  name: string
}

interface optionSchema extends originPicker {
  id: number
  name: string
}

interface IPickerProps<T extends baseOption> {
  options?: string[]
  optionApi?: () => Promise<T[]>
}

type itemProps<T extends baseOption> = INumberProps | IPickerProps<T>

interface IFormSchema<
  T extends keyof FormItemPropsMap = keyof FormItemPropsMap
> {
  type: T
  label: string
  field: string
  cell?: string
  formItemProps?: FormItemPropsMap[T]
}

interface SharePlatform {
  type: string
  name: string
  icon: string
  color: string
}

interface ShareData {
  title: string
  content: string
  image: string
  path: string
  query?: Record<string, string>
}

type ShareType = 'wechat' | 'moment' | 'qq' | 'weibo' | 'link' | 'poster'
