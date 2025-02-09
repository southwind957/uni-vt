type IFormType = 'Number' | 'Input'

interface IFormSchema {
  label: string
  field: string
  suffixIcon?: string
  placeholder: string
  cell?: string
  type: IFormType
}
