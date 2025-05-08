type IFormType = 'Number' | 'Input' | 'Password'

interface IFormSchema {
  label: string
  field: string
  suffixIcon?: string
  placeholder: string
  cell?: string
  type: IFormType
}
