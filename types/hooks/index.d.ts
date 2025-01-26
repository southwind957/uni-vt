interface ValidateRule<T = any> {
  required: boolean
  message: string
  validator?: (value: any, rule: any) => boolean | Promise<T>
  pattern: RegExp
}
