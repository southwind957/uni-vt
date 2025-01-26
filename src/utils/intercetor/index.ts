// 不需要登录的路由
const whiteList = ['*']

function isPermission(path: string): boolean {
  if (whiteList.includes('*')) {
    return true
  } else {
    const isLogin = uni.getStorageSync('isLogin')
    return isLogin || whiteList.indexOf(path) > -1
  }
}

const navigateIntercetor = {
  invoke: (options: any) => {
    const permission = isPermission(options.url)
    if (permission) {
      return
    } else {
      uni.showToast({ title: '请先登录', icon: 'none' })
      return false
    }
  }
}

export const routerInterceptor = {
  install() {
    uni.addInterceptor('navigateTo', navigateIntercetor)
    uni.addInterceptor('redirectTo', navigateIntercetor)
    uni.addInterceptor('reLaunch', navigateIntercetor)
    uni.addInterceptor('switchTab', navigateIntercetor)
  }
}
