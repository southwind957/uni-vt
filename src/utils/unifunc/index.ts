// 提示
export const Toast = (title: string, type: ToastType) => {
  uni.showToast({
    title: title,
    icon: type
  })
}
