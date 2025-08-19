<template>
  <view>
    <!-- 触发按钮槽 -->
    <slot name="trigger" :open="handleGenerate"></slot>

    <!-- 弹窗展示海报 -->
    <wd-overlay :show="showPoster" @click="showPoster = false">
      <view class="flex flex-col items-center justify-center h-full space-y-4">
        <!-- 占位 loading -->
        <view
          v-if="loading"
          class="rounded-xl bg-gray-200 animate-pulse"
          :style="imageStyle"
        ></view>

        <!-- 海报预览 -->
        <image
          v-else-if="posterUrl"
          :src="posterUrl"
          class="rounded-xl shadow-lg bg-white"
          mode="widthFix"
          :style="imageStyle"
        />

        <!-- 操作按钮 -->
        <view class="flex space-x-4">
          <slot
            name="actions"
            :save="savePoster"
            :close="() => (showPoster = false)"
          >
            <button
              @click.stop="savePoster"
              class="bg-white px-4 py-2 rounded-lg shadow"
            >
              保存到相册
            </button>
            <button
              @click.stop="showPoster = false"
              class="bg-white px-4 py-2 rounded-lg shadow"
            >
              关闭
            </button>
          </slot>
        </view>
      </view>
    </wd-overlay>

    <!-- 隐藏的绘制 canvas -->
    <canvas
      type="2d"
      :id="canvasId"
      :canvas-id="canvasId"
      style="width: 100%; height: 100%"
      v-show="false"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePoster } from '@/hooks/usePoster'

interface Props {
  canvasId?: string
  config: any // 生成海报配置
  imageStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  canvasId: 'posterCanvas',
  imageStyle: 'max-width: 90%; height: 80%;'
})

const { posterUrl, createPoster } = usePoster()
const showPoster = ref(false)
const loading = ref(false)

/** 生成海报并展示 */
const handleGenerate = async () => {
  if (loading.value) return
  loading.value = true
  showPoster.value = true

  try {
    await createPoster(props.config, props.canvasId)
  } catch (e) {
    console.error('生成海报失败:', e)
    uni.showToast({ title: '生成失败', icon: 'none' })
    showPoster.value = false
  } finally {
    loading.value = false
  }
}

/** 保存到相册 */
const savePoster = () => {
  if (!posterUrl.value) return
  uni.saveImageToPhotosAlbum({
    filePath: posterUrl.value,
    success: () => {
      uni.showToast({ title: '已保存到相册', icon: 'success' })
    },
    fail: (err) => {
      if (err.errMsg.includes('auth deny')) {
        uni.showModal({
          title: '提示',
          content: '需要授权保存到相册',
          showCancel: false,
          success: () => uni.openSetting({})
        })
      } else {
        uni.showToast({ title: '保存失败', icon: 'none' })
      }
    }
  })
}
</script>
