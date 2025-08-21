import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import * as Pinia from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
import { routerInterceptor } from '@/utils/intercetor'
import useShare from '@/hooks/useShare'
import i18n from '@/locales'

export function createApp() {
  const app = createSSRApp(App)
  const store = Pinia.createPinia()
  store.use(createUnistorage())
  app.use(store)
  app.use(i18n)
  app.mixin(useShare)

  routerInterceptor.install()
  return {
    app
  }
}
