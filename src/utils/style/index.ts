// 获取安全区大小
export const getSafeAreaSize = (): number => {
  let safeTop = 0
  const safeArea = uni.getSystemInfoSync()
  safeTop = (safeArea.safeAreaInsets && safeArea.safeAreaInsets.top) || 0
  return safeTop as number
}

// 获取顶部导航栏大小
export const getStatusBarSize = (): number => {
  let navBarHeight = 0
  // uniapp条件编译
  const sysInfo = uni.getSystemInfoSync()
  navBarHeight = sysInfo.windowTop || 0
  return navBarHeight as number
}

// px转 rpx
export const pxToRpx = (px: number, designWidth: number = 750): number => {
  const screenWidth = uni.getSystemInfoSync().screenWidth
  const scale = screenWidth / designWidth
  return Math.round(px / scale)
}
