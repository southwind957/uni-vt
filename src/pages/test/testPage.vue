<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { usePoster } from '@/hooks/usePoster'

const { posterUrl, createPoster } = usePoster()
const showPoster = ref(false)

// 画圆角矩形
const roundRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) => {
  const radius = Math.max(0, Math.min(r, Math.min(w, h) / 2))
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + w - radius, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
  ctx.lineTo(x + w, y + h - radius)
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
  ctx.lineTo(x + radius, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

const handlePoster = async () => {
  showPoster.value = true
  await nextTick()

  await createPoster({
    assets: {
      food: 'https://c-ssl.duitang.com/uploads/blog/202203/25/20220325000455_b53b5.jpg',
      qr: 'https://c-ssl.duitang.com/uploads/blog/202203/25/20220325000455_b53b5.jpg'
    },
    draw: (ctx, canvas, imgs, sys) => {
      console.log(sys)
      const width = canvas.width
      const height = canvas.height

      // 背景
      const BG = '#f36c3d'
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, width, height)

      const outerPad = 10
      const innerW = width - outerPad * 2
      const innerH = height - outerPad * 2
      const gapH = 12
      const radius = 12
      const topCardH = innerH * 0.7
      const bottomCardY = outerPad + topCardH + gapH
      const bottomCardH = innerH - topCardH - gapH

      // 上方图卡
      ctx.fillStyle = '#fff'
      roundRectPath(ctx, outerPad, outerPad, innerW, topCardH, radius)
      ctx.fill()
      ctx.save()
      roundRectPath(ctx, outerPad, outerPad, innerW, topCardH, radius)
      ctx.clip()
      ctx.drawImage(imgs.food, outerPad, outerPad, innerW, topCardH)
      ctx.restore()

      // 下方信息卡
      ctx.fillStyle = '#fff'
      roundRectPath(ctx, outerPad, bottomCardY, innerW, bottomCardH, radius)
      ctx.fill()

      const pad = 14
      const textLeft = outerPad + pad
      const textTopBase = bottomCardY + pad
      const nameSize = Math.floor(bottomCardH * 0.16)
      const codeSize = Math.floor(bottomCardH * 0.12)
      const priceSize = Math.floor(bottomCardH * 0.12)
      const tipSize = Math.floor(bottomCardH * 0.1)
      const qrSize = Math.min(bottomCardH * 0.5, innerW * 0.3)
      const qrX = outerPad + innerW - pad - qrSize
      const qrY = bottomCardY + pad

      ctx.fillStyle = '#333'
      ctx.font = `${nameSize}px sans-serif`
      ctx.fillText('卤肉盖饭 约500g', textLeft, textTopBase + 10)

      ctx.fillStyle = '#666'
      ctx.font = `${codeSize}px sans-serif`
      ctx.fillText('884866', textLeft, textTopBase + nameSize + 10)

      ctx.fillStyle = '#e60012'
      ctx.font = `bold ${priceSize}px sans-serif`
      ctx.fillText('¥15', textLeft, textTopBase + nameSize + 6 + codeSize + 45)

      ctx.drawImage(imgs.qr, qrX, qrY, qrSize, qrSize)

      ctx.fillStyle = '#e60012'
      ctx.font = `${tipSize}px sans-serif`
      ctx.fillText('长按识别二维码', qrX - 10, qrY + qrSize + tipSize + 2)
    }
  })

  showPoster.value = true
}
</script>

<template>
  <wd-button type="primary" @click="handlePoster">生成海报</wd-button>

  <view v-if="showPoster" class="fixed inset-0 bg-black/60 flex-center">
    <canvas
      type="2d"
      id="posterCanvas"
      style="width: 100%; height: 100%"
      v-show="false"
    />

    <image
      :src="posterUrl"
      mode="widthFix"
      class="w-4/5 rounded-xl shadow-lg"
    />
  </view>
</template>
