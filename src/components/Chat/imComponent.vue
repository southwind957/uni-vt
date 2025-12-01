<template>
  <view class="chat-page flex flex-col h-screen bg-gray-50">
    <view class="px-4 py-3 bg-white shadow-sm flex items-center gap-3">
      <image class="w-[80rpx] h-[80rpx] rounded-full" src="/static/logo.png" />
      <text class="font-bold text-lg">聊天</text>
    </view>

    <scroll-view
      scroll-y
      class="w-full h-[calc(100vh-160rpx)]"
      :scroll-into-view="scrollTo"
    >
      <view
        v-for="(msg, index) in msgList"
        :key="index"
        :id="'msg-' + index"
        class="animate-fade-in"
      >
        <view
          class="flex items-end gap-2"
          :class="msg.self ? 'justify-end flex-row-reverse' : 'justify-start'"
        >
          <image class="w-[80rpx] h-[80rpx] rounded-full" :src="msg.avatar" />

          <view
            class="max-w-60 px-3 py-2 rounded-2xl text-sm"
            :class="
              msg.self
                ? 'bg-blue-500 text-white rounded-br-sm ml-auto'
                : 'bg-white text-gray-800 shadow rounded-bl-sm mr-auto'
            "
          >
            {{ msg.text }}
          </view>
        </view>
      </view>
    </scroll-view>

    <view class="p-3 bg-white flex items-center gap-2 border-t border-gray-200">
      <input
        v-model="input"
        placeholder="说点什么..."
        class="flex-1 px-3 py-2 bg-gray-100 rounded-full text-sm outline-none"
      />
      <button
        @click="sendMsg"
        class="px-4 py-2 bg-blue-500 text-white rounded-full text-sm active:scale-95"
      >
        发送
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick, onUnmounted } from 'vue'
import { bus } from '@/utils/event/eventBus'

interface Msg {
  text: string
  self: boolean
  avatar: string
}

const input = ref('')
const msgList = ref<Msg[]>([
  { text: '你好呀 👋', self: false, avatar: '/static/logo.png' }
])

const scrollTo = ref('')

const offChat = bus.on('im:recv', (msg) => {
  msgList.value.push({
    text: msg?.original?.content,
    self: false,
    avatar: '/static/logo.png'
  })
})

function sendMsg() {
  if (!input.value) return
  bus.emit('chat:send', {
    type: 'chat',
    from: 'userA',
    to: 'userB',
    content: input.value,
    time: Date.now()
  })
  msgList.value.push({
    text: input.value,
    self: true,
    avatar: '/static/logo.png'
  })
  input.value = ''

  nextTick(() => {
    scrollTo.value = 'msg-' + (msgList.value.length - 1)
  })
}

onUnmounted(() => {
  offChat() // 清除监听
})
</script>

<style scoped>
@keyframes fadeInScale {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fadeInScale 0.25s ease-out;
}
</style>
