import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import * as Pinia from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'
import Mock from './mock'
import { routerInterceptor } from './utils/intercetor'

const mockEnable = import.meta.env.VITE_MOCK === 'true'
const mockUse = mockEnable ? Mock : undefined

export function createApp() {
  const app = createSSRApp(App)
  const store = Pinia.createPinia()
  store.use(createUnistorage())
  app.use(store)
  routerInterceptor.install()
  return {
    app,
    mockUse
  }
}
