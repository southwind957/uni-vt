import { getSafeAreaSize, pxToRpx } from '@/utils/style'
import { defineStore } from 'pinia'

type safeArea = {
  top: number
}

export const useStyleStore = defineStore('style', {
  unistorage: true,
  state: (): {
    safeArea: safeArea
  } => {
    return {
      safeArea: {
        top: 0
      }
    }
  },
  getters: {
    getSafeAreaTop(): number {
      return this.safeArea.top
    }
  },
  actions: {
    setSafeArea() {
      this.safeArea.top = pxToRpx(getSafeAreaSize())
    }
  }
})
