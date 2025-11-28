declare namespace IFormItemProps {
  interface InputProps {
    placeholder?: string
    clearable?: boolean
  }

  interface PasswordProps {
    placeholder?: string
    clearable?: boolean
  }

  interface NumberProps {
    min?: number
    max?: number
    step?: number
  }

  interface PickerProps {
    options?: string[]
    optionApi?: () => Promise<IResponse<IList<optionSchema>>>
  }

  interface TextareaProps {
    placeholder?: string
    rows?: number
  }

  interface RateProps {
    icon?: string
    activeColor?: string
  }

  interface SwitchProps {
    activeColor?: string
    inactiveColor?: string
  }

  interface SignProps {
    backgroundColor?: string
    exportScale?: number
  }

  interface InputAddress {
    placeholder?: string
    clearable?: boolean
  }
}

interface FormItemPropsMap {
  Input: IFormItemProps.InputProps
  Password: IFormItemProps.PasswordProps
  Number: IFormItemProps.NumberProps
  Picker: IFormItemProps.PickerProps
  Textarea: IFormItemProps.TextareaProps
  Rate: IFormItemProps.RateProps
  Switch: IFormItemProps.SwitchProps
  Sign: IFormItemProps.SignProps
  InputAddress: IFormItemProps.InputAddress
}
