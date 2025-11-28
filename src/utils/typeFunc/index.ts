/**
 *
 * @param obj 要检查的对象
 * @param keys 要检查的属性键名数组
 * @returns 如果对象包含指定键名的属性，则返回true；否则返回false
 */
export function hasKeys<T extends object, K extends string>(
  obj: T | undefined,
  keys: readonly K[]
): obj is T & Record<K, any> {
  return !!obj && keys.every((k) => k in obj)
}
