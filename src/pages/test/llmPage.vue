<template>
  <view
    class="chat-page w-[96%] mx-auto flex flex-col h-screen overflow-hidden"
  >
    <!-- 消息区 -->
    <view class="flex-1 min-h-0">
      <scroll-view
        class="h-full pb-20"
        scroll-y
        :show-scrollbar="false"
        :scroll-top="scrollInto"
      >
        <view id="scrollContent">
          <view
            v-for="(msg, index) in messages"
            :key="index"
            :id="'msg-' + index"
          >
            <view
              class="mb-3 flex items-start"
              :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
            >
              <image
                v-if="msg.role === 'ai'"
                src="/static/logo.png"
                class="w-50 h-50 rounded-full mr-2"
                mode="aspectFill"
              />
              <view
                class="chat-bubble max-w-[70%] px-3 py-2 rounded-2xl shadow text-sm"
                :class="
                  msg.role === 'user'
                    ? 'bg-blue-500 text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                "
              >
                {{ msg.content }}
              </view>
              <image
                v-if="msg.role === 'user'"
                :src="userAvatar"
                class="w-50 h-50 rounded-full ml-2"
                mode="aspectFill"
              />
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 底部输入区 -->
    <view
      class="chat-input-area flex items-center gap-2 flex-shrink-0"
      :style="{ paddingBottom: `${bottom}rpx` }"
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
      <wd-button type="primary" size="small" @click="sendMessage"
        >发送</wd-button
      >
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick, computed } from 'vue'
import useStore from '@/store'

const bottom = computed(() => {
  return useStore().useSafeArea.getSafeAreaBottom
})

interface Message {
  role: 'user' | 'ai'
  content: string
}

const input = ref('')
const messages = ref<Message[]>([])
const scrollInto = ref<string>('') // 改为 string

const userAvatar = uni.getStorageSync('userAvatar') || '/static/logo.png'

// 模拟 AI 回复
const fakeAiReply = async (msg: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`AI 回复: 我收到了 "${msg}"`)
    }, 500)
  })
}

const getContentHeight = (id: string) => {
  // TODO 由于在设置滚动时，没有历史dom高度，所以导致每次都只能获取当前dom的高度，导致重新开窗口时无法滚动和滚动混乱
  //   解决方案：
  // 加上一层父dom，每次都获取父dom的高度，加上将要更新的高度，就能解决这个问题
  const query = uni
    .createSelectorQuery()
    .in(getCurrentPages()[getCurrentPages().length - 1])
  query
    .select(`#${id}`)
    .boundingClientRect((data) => {
      if (data) {
        console.log('内容高度:', data.height)
        scrollInto.value = data.height
      }
    })
    .exec()
}

const sendMessage = async () => {
  if (!input.value.trim()) return

  messages.value.push({ role: 'user', content: input.value })
  input.value = ''

  const reply = await fakeAiReply(
    messages.value[messages.value.length - 1].content
  )

  messages.value.push({ role: 'ai', content: '' })
  const aiIndex = messages.value.length - 1

  let i = 0
  const timer = setInterval(() => {
    if (i < reply.length) {
      messages.value[aiIndex].content += reply[i]
      i++
      // 每次追加内容后强制滚动到底部
      nextTick(() => {
        getContentHeight('msg-' + aiIndex)
      })
    } else {
      clearInterval(timer)
    }
  }, 40)
}
</script>

<style scoped>
.chat-bubble {
  white-space: pre-wrap;
  word-break: break-all;
  display: inline-block;
}

/* 隐藏 scroll-view 滚动条 */
scroll-view ::-webkit-scrollbar {
  appearance: none;
  color: transparent;
  display: none;
  width: 0;
  height: 0;
}

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
