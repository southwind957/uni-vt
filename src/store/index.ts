import { useStyleStore } from './modules/safeArea'
import { useThemeStore } from './modules/theme'

const useStore = () => {
  return {
    useSafeArea: useStyleStore(),
    useTheme: useThemeStore()
  }
}

export default useStore
