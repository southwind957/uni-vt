type path = {
  type?: string
  action: 'navigate'
  target: string
}

type fill = {
  type?: string
  action: 'fill'
  target: string
  value: string
}

type chat = {
  type?: string
  action: 'chat'
  query: string
}

type AICommand = path | fill | chat
