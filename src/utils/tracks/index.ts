import { trackData } from '@/api/track'

const BUFFER_MAX = 10
const MAX_INTERVAL = 5000
let buffer: TrackPayload[] = []

let timer: any = null

function getPagePath() {
  try {
    const pages = getCurrentPages?.() || []
    const cur = pages[pages.length - 1] as any
    return cur?.route || cur?.$page?.fullPath || ''
  } catch {
    return ''
  }
}

export function track(event: string, params: Record<string, any> = {}) {
  console.log('track', event, params)
  const payload: TrackPayload = {
    event,
    params,
    ts: Date.now(),
    page: getPagePath()
  }
  buffer.push(payload)
  if (buffer.length >= BUFFER_MAX) {
    flush()
    return
  }
  if (!timer) {
    timer = setTimeout(() => {
      flush()
    }, MAX_INTERVAL)
  }
}

export async function flush() {
  if (!buffer.length) return
  clearTimeout(timer)
  timer = null
  const data = buffer.slice()
  buffer = []
  const res = await trackData(data)
  if (res.code !== 200) {
    buffer.unshift(...data)
  }
}
