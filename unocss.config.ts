import presetWeapp from 'unocss-preset-weapp'
import {
  transformerAttributify,
  transformerClass
} from 'unocss-preset-weapp/transformer'
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetWeapp(),
    // 按需引入
    presetIcons({
      // 更多的图标在下面加入即可
      collections: {
        carbon: () =>
          import('@iconify-json/carbon/icons.json').then((i) => i.default)
      }
    })
  ],
  shortcuts: [
    {
      'border-base': 'border border-[#eee]',
      'flex-center': 'flex justify-center items-center',
      'text-c1': 'text-[#181818]',
      'text-c2': 'text-[#333333]',
      'text-c3': 'text-[#B2B2B2]',
      'text-c4': 'text-[#CCCCCC]',
      bg: 'bg-[#f6f7fb]'
    }
  ],
  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify(),

    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass()
  ]
})
