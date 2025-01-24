<template>
  <view>
    <wd-overlay :show="show">
      <view class="w-[100vw] h-[100vh] flex items-center justify-center">
        <view class="block w-[70vw] h-[20vh] bg-white" />
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped></style>
