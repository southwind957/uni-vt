type IFormType = 'Number' | 'Input' | 'Password'

interface IFormSchema {
  label: string
  field: string
  suffixIcon?: string
  placeholder: string
  cell?: string
  type: IFormType
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
