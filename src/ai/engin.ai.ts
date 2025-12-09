// 执行AI命令
export function runAICommand(cmd: AICommand) {
  console.log('runAICommand', cmd)

  if (!cmd || !cmd.action) {
    console.warn('AI指令无效:', cmd)
    return
  }

  switch (cmd.action) {
    case 'navigate':
      uni.navigateTo({ url: cmd.target })
      break

    case 'fill':
      uni.$emit('ai-fill', cmd)
      break

    default:
      console.warn('未知 AI Action:', cmd)
  }
}
