type ToastType =
  | 'error'
  | 'success'
  | 'loading'
  | 'none'
  | 'fail'
  | 'exception'
  | undefined

type GroupByFunction<T, K> = (item: T) => K
