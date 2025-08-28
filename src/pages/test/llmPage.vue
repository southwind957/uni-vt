<template>
  <Chat>
    <template #bottom="{ send }">
      <view
        class="chat-input-area flex items-center gap-2 flex-shrink-0"
        :style="{ paddingBottom: `${bottomH}rpx` }"
      >
        <view class="flex-1">
          <wd-textarea
            v-model="input"
            placeholder="和 AI 聊聊吧..."
            auto-height
            :rows="2"
            class="chat-textarea"
          />
        </view>
        <wd-button type="primary" size="small" @click="handleSend(send)"
          >发送</wd-button
        >
      </view>
    </template>
  </Chat>
</template>

<script lang="ts" setup>
import Chat from '@/components/Chat/chatComponent.vue'
import { ref, computed } from 'vue'
import useStore from '@/store'

const bottomH = computed(() => {
  return useStore().useSafeArea.getSafeAreaBottom
})

const input = ref('')

const handleSend = (send: (content: string) => Promise<void>) => {
  if (!input.value.trim()) return
  send(input.value)
  input.value = ''
}
</script>

<style lang="scss" scoped>
.chat-input-area {
  padding: 12px 12px;
  border-top: 1px solid #e5e7eb;
  background-color: #fff;
  min-height: 70px;
  box-sizing: border-box;
  align-items: flex-end;
}

:deep(.chat-textarea__inner) {
  width: 100% !important;
  min-height: 44px;
  max-height: 120px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 14px;
  line-height: 20px;
  background-color: #fff;
  resize: none;
}

:deep(.chat-textarea__inner:focus-within) {
  border: 2px solid #3b82f6 !important;
}
</style>
