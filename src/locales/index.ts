import { createI18n } from 'vue-i18n'
import zh from '@/locales/zh'

import en from '@/locales/en'

// 构造i18n对象
const i18n = createI18n({
  legacy: false,
  locale: uni.getLocale(), // 获取已设置的语言

  // 引入语言文件
  messages: {
    zh: zh,
    en: en
  }
})

uni.onLocaleChange((res) => {
  console.log('语言切换', res)
  i18n.global.locale.value = res.locale as 'zh' | 'en'
})

export default i18n
