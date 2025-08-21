import { ref } from 'vue'

export interface PosterParams {
  assets: Record<string, string> // 资源（图片 url）
  draw: (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    imgs: Record<string, HTMLImageElement>,
    sys: UniApp.GetSystemInfoResult
  ) => void
}

export function usePoster() {
  const posterUrl = ref('')

  const createPoster = (params: PosterParams) => {
    return new Promise<void>((resolve, reject) => {
      uni.getSystemInfo({
        success: (sys) => {
          const width = sys.windowWidth * 0.9
          const height = sys.windowHeight * 0.65

          const query = uni.createSelectorQuery()
          query
            .select('#posterCanvas')
            .fields({ node: true, size: true })
            .exec(async (res) => {
              try {
                const canvas = res[0].node as HTMLCanvasElement
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
                canvas.width = width
                canvas.height = height

                // 预加载图片
                const imgs: Record<string, HTMLImageElement> = {}
                await Promise.all(
                  Object.entries(params.assets).map(
                    async ([key, url]) =>
                      (imgs[key] = await new Promise<HTMLImageElement>(
                        (resolveImg, rejectImg) => {
                          const img = (canvas as any).createImage()
                          img.onload = () => resolveImg(img)
                          img.onerror = rejectImg
                          img.src = url
                        }
                      ))
                  )
                )

                // 👉 调用传入的绘制函数
                params.draw(ctx, canvas, imgs, sys)

                // 导出
                uni.canvasToTempFilePath({
                  canvas,
                  success: (res) => {
                    posterUrl.value = res.tempFilePath
                    resolve()
                  },
                  fail: reject
                })
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
