import { getSafeAreaSize, pxToRpx } from '@/utils/style'
import { defineStore } from 'pinia'

type safeArea = {
  top: number
  bottom: number
}

export const useStyleStore = defineStore('style', {
  unistorage: true,
  state: (): {
    safeArea: safeArea
  } => {
    return {
      safeArea: {
        top: 0,
        bottom: 0
      }
    }
  },
  getters: {
    getSafeAreaTop(): number {
      return this.safeArea.top || 40
    },
    getSafeAreaBottom(): number {
      return this.safeArea.bottom || 40
    }
  },
  actions: {
    setSafeArea() {
      const safeArea = getSafeAreaSize()
      this.safeArea.top = pxToRpx(safeArea.top)
      this.safeArea.bottom = pxToRpx(safeArea.bottom)
    }
  }
})
