import { defineStore } from 'pinia'
import { ref } from 'vue'
import { changeNavaBar } from '@/utils/unifunc'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref('light')
  const toggleTheme = () => {
    const currentTheme = theme.value === 'light' ? 'dark' : 'light'
    theme.value = currentTheme
    changeNavaBar(currentTheme)
  }
  return { theme, toggleTheme }
})
