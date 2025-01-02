import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default async () => {
  const UnoCss = await import('unocss/vite').then((i) => i.default)
  return defineConfig({
    plugins: [
      uni(),
      UnoCss(),
      eslint({
        lintOnStart: true,
        cache: false
      })
    ]
  })
}
