// 不需要登录的路由
const whiteList = [
  '/pages/mine/minePage',
  '/pages/order/orderPage',
  '/pages/index/homePage',
  '/subPackages/rmMaster/pages/loginPage'
]

// 切换到师傅端时，清空缓存将islogin置空
// 切换回用户端时，情况缓存将islogin置空
function isPermission(path: string): boolean {
  const isLogin = uni.getStorageSync('isLogin')
  return isLogin || whiteList.indexOf(path) > -1
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
