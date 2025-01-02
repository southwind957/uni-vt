import tripledes from 'crypto-js/tripledes'
import { apiSecurityKey } from './config'
import { isEmpty } from '@/utils/others'
import CryptoJS from 'crypto-js'

const disabled = import.meta.env.VITE_APP_ENCRYPTION_DISABLE
const key = apiSecurityKey

/**
 * @description: 加密
 * @param {object} data
 * @return {string}
 */
export const encrypt = (data: string | object): string | object => {
  if (disabled === '0' || isEmpty(disabled)) {
    return data
  }
  return tripledes.encrypt(JSON.stringify(data), key).toString()
}

/**
 * @description: 解密
 * @param {string} data
 * @return {object}
 */
export const decrypt = (data: string | object): any => {
  if (typeof data === 'object') {
    console.log('data', data)
    return data
  }
  return JSON.parse(tripledes.decrypt(data, key).toString(CryptoJS.enc.Utf8))
}
