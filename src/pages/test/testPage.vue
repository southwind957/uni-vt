<template>
  <view class="p-4">
    <button @click="handlePoster">生成海报</button>

    <!-- 弹窗 Overlay -->
    <wd-overlay :show="showPoster" @click="showPoster = false">
      <view class="flex flex-col items-center justify-center h-full space-y-4">
        <image
          v-if="posterUrl"
          :src="posterUrl"
          class="rounded-xl shadow-lg bg-white"
          mode="widthFix"
          style="max-width: 90%; max-height: 70%"
        />
        <view class="flex space-x-4">
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
        </view>
      </view>
    </wd-overlay>

    <!-- 隐藏 canvas -->
    <canvas
      type="2d"
      id="posterCanvas"
      canvas-id="posterCanvas"
      style="width: 100%; height: 100%"
      v-show="false"
    />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePoster } from '@/hooks/usePoster'

const { posterUrl, createPoster } = usePoster()
const showPoster = ref(false)

const handlePoster = async () => {
  await createPoster({
    foodImg:
      'https://c-ssl.duitang.com/uploads/blog/202203/25/20220325000455_b53b5.jpg',
    qrImg:
      'https://c-ssl.duitang.com/uploads/blog/202203/25/20220325000455_b53b5.jpg',
    name: '卤肉盖饭 约500g',
    code: '884866',
    price: '15'
  })
  showPoster.value = true
}

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
          success: () => {
            uni.openSetting({})
          }
        })
      } else {
        uni.showToast({ title: '保存失败', icon: 'none' })
      }
    }
  })
}
</script>
