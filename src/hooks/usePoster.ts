import { ref } from 'vue'

export function usePoster() {
  const posterUrl = ref('')

  // 画圆角矩形路径
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

  const createPoster = (params: PosterParams) => {
    const { foodImg, qrImg, name, code, price } = params

    return new Promise<void>((resolve, reject) => {
      uni.getSystemInfo({
        success: (sys) => {
          const width = sys.windowWidth * 0.9 // 90% 屏幕宽度
          const height = sys.windowHeight * 0.65 // 65% 屏幕高度

          const query = uni.createSelectorQuery()
          query
            .select('#posterCanvas')
            .fields({ node: true, size: true })
            .exec((res) => {
              try {
                const canvas = res[0].node as HTMLCanvasElement
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

                canvas.width = width
                canvas.height = height

                // 背景色
                const BG = '#f36c3d'
                ctx.fillStyle = BG
                ctx.fillRect(0, 0, width, height)

                // 布局参数
                const outerPad = 10 // 外边距
                const innerW = width - outerPad * 2
                const innerH = height - outerPad * 2
                const gapH = 12 // 中间背景色间隔（直角）
                const radius = 12 // 卡片圆角半径

                // 两张卡片高度分配：上图40%，下卡剩余
                const topCardH = innerH * 0.7
                const bottomCardY = outerPad + topCardH + gapH
                const bottomCardH = innerH - topCardH - gapH

                // 加载图片（并行）
                const loadImage = (url: string): Promise<HTMLImageElement> =>
                  new Promise((resolveImg, rejectImg) => {
                    const img = (canvas as any).createImage()
                    img.onload = () => resolveImg(img)
                    img.onerror = rejectImg
                    img.src = url
                  })

                Promise.all([loadImage(foodImg), loadImage(qrImg)])
                  .then(([food, qr]) => {
                    // ---- 上方图片圆角卡片 ----
                    const topX = outerPad
                    const topY = outerPad
                    const topW = innerW
                    const topH = topCardH

                    // 卡片底色（白）
                    ctx.fillStyle = '#fff'
                    roundRectPath(ctx, topX, topY, topW, topH, radius)
                    ctx.fill()

                    // 裁剪后绘制图片（图片也有圆角）
                    ctx.save()
                    roundRectPath(ctx, topX, topY, topW, topH, radius)
                    ctx.clip()
                    // 拉伸填满卡片（如果不想拉伸，可自行按比例铺满/contain）
                    ctx.drawImage(food, topX, topY, topW, topH)
                    ctx.restore()

                    // ---- 下方信息圆角卡片 ----
                    const botX = outerPad
                    const botY = bottomCardY
                    const botW = innerW
                    const botH = bottomCardH

                    ctx.fillStyle = '#fff'
                    roundRectPath(ctx, botX, botY, botW, botH, radius)
                    ctx.fill()

                    // 在下方卡片内部排版
                    const pad = 14
                    const textLeft = botX + pad
                    const textTopBase = botY + pad

                    // 字体大小（随高度）
                    const nameSize = Math.floor(botH * 0.16) // 名称
                    const codeSize = Math.floor(botH * 0.12) // 编号
                    const priceSize = Math.floor(botH * 0.12) // 价格
                    const tipSize = Math.floor(botH * 0.1) // 提示

                    // 右侧二维码区域
                    const qrSize = Math.min(botH * 0.5, botW * 0.3)
                    const qrX = botX + botW - pad - qrSize
                    const qrY = botY + pad

                    // 名称
                    ctx.fillStyle = '#333'
                    ctx.font = `${nameSize}px sans-serif`
                    ctx.textBaseline = 'top'
                    ctx.fillText(name, textLeft, textTopBase)

                    // 编号
                    ctx.fillStyle = '#666'
                    ctx.font = `${codeSize}px sans-serif`
                    ctx.fillText(code, textLeft, textTopBase + nameSize + 6)

                    // 价格
                    ctx.fillStyle = '#e60012'
                    ctx.font = `bold ${priceSize}px sans-serif`
                    ctx.fillText(
                      `¥${price}`,
                      textLeft,
                      textTopBase + nameSize + 6 + codeSize + 50
                    )

                    // 二维码（在卡片内部）
                    ctx.drawImage(qr, qrX, qrY, qrSize, qrSize)

                    // 二维码提示
                    ctx.fillStyle = '#e60012'
                    ctx.font = `${tipSize}px sans-serif`
                    ctx.textBaseline = 'alphabetic'
                    ctx.fillText(
                      '长按识别二维码',
                      qrX - 10,
                      qrY + qrSize + tipSize + 2
                    )

                    // 导出
                    uni.canvasToTempFilePath({
                      canvas,
                      success: (res) => {
                        posterUrl.value = res.tempFilePath
                        resolve()
                      },
                      fail: reject
                    })
                  })
                  .catch(reject)
              } catch (err) {
                reject(err)
              }
            })
        },
        fail: reject
      })
    })
  }

  return { posterUrl, createPoster }
}
