import { useStyleStore } from './modules/safeArea'

const useStore = () => {
  return {
    useSafeArea: useStyleStore()
  }
}

export default useStore
