import { defineConfig, UserConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default async (): Promise<UserConfig> => {
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
      },
      eslintPlugin({
        fix: true,
        cache: false
      })
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
      target: 'ES2015',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  })
}
