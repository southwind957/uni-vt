<template>
  <view class="p-4">
    <text>状态：{{ status }}</text>

    <button @click="sendMsg" class="bg-blue-500 text-white p-2 mt-4">
      发送消息
    </button>
  </view>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { bus } from '@/utils/im/eventBus'
import { createIM } from '@/utils/im/imCore'

const im = createIM({
  url: 'ws://192.168.1.50:8080',
  userId: 'userA'
})

const { status, connect } = im

// 页面初始化 → 启动 IM
onMounted(() => {
  connect()
})

// 页面监听聊天消息
const offChat = bus.on('chat:recv', (msg) => {
  console.log('页面收到聊天消息:', msg)
})

onUnmounted(() => {
  offChat() // 清除监听
})

// 发送消息（页面只发事件，不操作 IM）
function sendMsg() {
  bus.emit('chat:send', {
    type: 'chat',
    from: 'userA',
    to: 'userB',
    content: '你好，WebSocket！',
    time: Date.now()
  })
}
</script>
