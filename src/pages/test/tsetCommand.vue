<template>
  <view>
    <text>AI 控制输入示例</text>
    <input v-model="name" placeholder="请输入姓名" />
    <button @click="simulateAI">模拟 AI 填写</button>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { runAICommand } from '@/ai/engin.ai'

// 表单变量
const name = ref('')

// 监听AI触发的填充事件
const onAIFill = (cmd: Extract<AICommand, { action: 'fill' }>) => {
  if (cmd.target === 'input1') name.value = cmd.value
}

onMounted(() => uni.$on('ai-fill', onAIFill))
onUnmounted(() => uni.$off('ai-fill', onAIFill))

function simulateAI() {
  const command: AICommand = {
    action: 'fill',
    target: 'input1',
    value: '张三'
  }

  runAICommand(command)
}
</script>
