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

// src/utils/useScanCode.ts
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
