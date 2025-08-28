import { useI18n } from 'vue-i18n'

/**
 * 设置导航栏标题（自动根据多语言 key 翻译）
 */
export function setNavTitle(key: string) {
  console.log('设置导航栏标题', key)
  const { t } = useI18n()
  uni.setNavigationBarTitle({
    title: t(key)
  })
}

// 提示
export const Toast = (title: string, type: ToastType) => {
  uni.showToast({
    title: title,
    icon: type
  })
}

type ScanCodeOptions = Parameters<typeof uni.scanCode>[0]

// success 回调参数类型
type ScanCodeResult = NonNullable<
  NonNullable<ScanCodeOptions['success']> extends (arg: infer R) => any
    ? R
    : never
>

export function useScanCode(options?: UniApp.ScanCodeOptions) {
  return new Promise<ScanCodeResult>((resolve, reject) => {
    uni.scanCode({
      scanType: ['qrCode', 'barCode'], // 支持二维码、条形码
      onlyFromCamera: false, // 默认允许相册选取
      ...options,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export function usePreviewImage(url: string) {
  return new Promise((resolve, reject) => {
    uni.previewImage({
      urls: [url],
      current: url,
      indicator: 'default',
      loop: false,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

export function changeNavaBar(theme: string) {
  if (theme === 'dark') {
    uni.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#61dafb'
    })
  } else {
    uni.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#42b983'
    })
  }
}

import type { ComponentInternalInstance } from 'vue'
// 获取指定dom高度
export const getContentHeight = (
  id: string,
  instance: ComponentInternalInstance | null
): Promise<number> => {
  return new Promise((resolve) => {
    const query = uni.createSelectorQuery().in(instance)
    query
      .select(`#${id}`)
      .boundingClientRect((data) => {
        if (data) {
          resolve(data.height)
        } else {
          resolve(0)
        }
      })
      .exec()
  })
}
