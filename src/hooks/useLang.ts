import { ref } from 'vue'
import i18n from '@/locales'

const currentLang = ref<string>(uni.getLocale() || 'zh')

i18n.global.locale.value = currentLang.value as 'zh' | 'en'

/**
 * 切换语言
 * @param lang 'zh' | 'en'
 * @param save 是否持久化（默认 true）
 */
function setLang(lang: 'zh' | 'en') {
  console.log('切换语言', lang)
  uni.setLocale(lang)
  i18n.global.locale.value = lang
  currentLang.value = lang

  //   uni.setTabBarItem({
  //     index: 2,
  //     text: t('tabBar.center')
  //   })
}

/**
 * 获取当前语言
 */
function getLang() {
  return currentLang.value
}

export function useLang() {
  return {
    currentLang,
    setLang,
    getLang
  }
}
