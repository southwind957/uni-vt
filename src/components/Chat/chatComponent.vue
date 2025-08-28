<template>
  <view
    class="chat-page w-[96%] mx-auto flex flex-col h-screen overflow-hidden"
  >
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
          <view v-if="loading" class="flex items-center justify-center mt-10">
            <text>正在思考中...</text>
            <wd-loading size="50rpx" />
          </view>
        </view>
      </scroll-view>
    </view>
    <slot name="bottom" :send="sendMessage"></slot>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick, getCurrentInstance } from 'vue'
import { getContentHeight } from '@/utils/unifunc'
import { PostItemsAi } from '@/api/test'

const instance = getCurrentInstance()

interface Message {
  role: 'user' | 'ai'
  content: string
}

const messages = ref<Message[]>([])
const scrollInto = ref<number>(0)
const loading = ref<boolean>(false)

const userAvatar = uni.getStorageSync('userAvatar') || '/static/logo.png'

// AI 回复
const fakeAiReply = async (msg: string): Promise<string> => {
  try {
    loading.value = true
    const res = await PostItemsAi(msg)
    console.log('PostItemsAi', res)
    const result = res.choices[0].message.content
    return result
  } catch (error) {
    console.log('error', error)
    loading.value = false
    return '请检查相关配置或网络'
  } finally {
    loading.value = false
  }
}

const sendMessage = async (msg: string) => {
  if (!msg.trim()) return

  messages.value.push({ role: 'user', content: msg })
  const parentHeight = await getContentHeight('scrollContent', instance)
  nextTick(() => {
    scrollInto.value = parentHeight
  })

  const reply = await fakeAiReply(
    messages.value[messages.value.length - 1].content
  )

  messages.value.push({ role: 'ai', content: '' })
  const aiIndex = messages.value.length - 1
  //  先获取父dom的高度
  let i = 0
  const timer = setInterval(() => {
    if (i < reply.length) {
      messages.value[aiIndex].content += reply[i]
      i++
      // 每次追加内容后强制滚动到底部
      if (i % 10 === 0 || i === reply.length) {
        nextTick(async () => {
          const currIdHeight = await getContentHeight(
            'msg-' + aiIndex,
            instance
          )
          scrollInto.value = parentHeight + currIdHeight
        })
      }
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
</style>
