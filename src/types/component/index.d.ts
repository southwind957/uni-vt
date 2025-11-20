type FormDataType = {
  [key in string]: string | number
}

interface baseOption {
  id: string | number
  name: string
}

interface originPicker extends baseOption {
  [key in string]: any
}

type IFormType =
  | 'Number'
  | 'Input'
  | 'Password'
  | 'Picker'
  | 'InputAddress'
  | 'Checkbox'
  | 'Rate'
  | 'Switch'
  | 'Sign'

interface INumberProps {
  min?: number
  max?: number
  step?: number
}

interface IPickerProps<T extends baseOption> {
  options?: string[]
  optionApi?: () => Promise<T[]>
}

type itemProps<T extends baseOption> = INumberProps | IPickerProps<T>

interface IFormSchema<T = any> {
  label: string
  field: string
  suffixIcon?: string
  placeholder: string
  cell?: string
  type: IFormType
  formItemProps?: itemProps<T>
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
