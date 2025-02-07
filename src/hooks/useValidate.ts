// 这里是Validate的钩子，提供常用的钩子校验规则
export function useValidateRule() {
  // 闭包函数生成单个规则
  const generate = (options: RuleOptions): ValidateRule[] => {
    const type = options?.checkType ?? 'Defalut'
    const message = options?.message ?? '该字段不允许为空'
    switch (type) {
      case 'Defalut':
        return [
          {
            required: true,
            message
          }
        ]
      case 'RegExp':
        return [
          {
            required: true,
            message,
            pattern: options.pattern
          }
        ]
      default:
        return [
          {
            required: true,
            message,
            validator: options.validator
          }
        ]
    }
  }

  // 生成整个规则
  const Rule = (
    options: RuleOptions[]
  ): {
    [key: string]: ValidateRule[]
  } => {
    const rules: { [key: string]: ValidateRule[] } = {}
    for (const option of options) {
      rules[option.field] = generate(option)
    }
    return rules
  }
  return { Rule }
}
