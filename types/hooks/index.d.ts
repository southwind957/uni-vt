interface ValidateRule<T = any> {
  required: boolean
  message: string
  validator?: (value: any, rule: any) => boolean | Promise<T>
  pattern?: RegExp
}

type checkEnum = 'Defalut' | 'RegExp' | 'Function'

interface RuleOptions {
  message: string
  validator?: (value: any) => boolean | Promise<boolean>
  pattern?: RegExp
  checkType: checkEnum
  field: string
}
