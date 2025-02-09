export function isEmpty<T>(value: T): boolean {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'string') {
    return value.length === 0
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}

export const isWhiteList = (whiteList: string[], path: string): boolean => {
  return whiteList.some((item) => {
    return path.indexOf(item) > -1
  })
}

export function groupBy<T, K extends string | number | symbol>(
  array: T[],
  keyFn: GroupByFunction<T, K>
): Record<K, T[]> {
  return array.reduce(
    (result, item) => {
      const key = keyFn(item)
      if (!result[key]) {
        result[key] = []
      }
      result[key].push(item)
      return result
    },
    {} as Record<K, T[]>
  )
}
