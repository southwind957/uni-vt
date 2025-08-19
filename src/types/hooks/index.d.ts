interface ValidateRule<T = any> {
  required: boolean
  message: string
  validator?: (value: any, rule: any) => boolean | Promise<T>
  pattern?: RegExp
}

type checkEnum = 'RegExp' | 'Function'

interface RuleOptions {
  message?: string
  validator?: (value: any) => boolean | Promise<boolean>
  pattern?: RegExp
  checkType?: checkEnum
  field: string
}

interface ShareOptions {
  title: string
  path?: string //朋友圈不支持路径
  imageUrl: string
  onlineImageUrl?: string
  desc?: string
  success?: (res: any) => void
  fail?: (res: any) => void
}

interface PosterParams {
  foodImg: string // 食物图片链接
  qrImg: string // 二维码图片链接
  name: string // 食物名称
  code: string // 编号
  price: string // 价格
}
