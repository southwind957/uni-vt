import { ref } from 'vue'

const theme = ref<'light' | 'dark'>('light')

export function useThemeStore() {
  const setTheme = (value: 'light' | 'dark') => {
    theme.value = value
    uni.setStorageSync('theme', value)
  }

  const initTheme = () => {
    const saved = uni.getStorageSync('theme') as 'light' | 'dark'
    if (saved) {
      theme.value = saved
    }
  }

  return { theme, setTheme, initTheme }
}
