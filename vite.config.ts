import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default async () => {
  const UnoCss = await import('unocss/vite').then((i) => i.default)
  return defineConfig({
    plugins: [
      Uni(),
      UnoCss(),
      // 绕过vite检查.vue文件
      {
        name: 'fix-vite-plugin-vue',
        configResolved(config) {
          const plugin = config.plugins.find((p) => p.name === 'vite:vue')
          if (plugin && plugin.api && plugin.api.options) {
            plugin.api.options.devToolsEnabled = false
          }
        }
      }
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/styles/mixins.scss";
          `
        }
      }
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  })
}
