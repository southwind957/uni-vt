type path = {
  action: 'navigate'
  path: string
}

type fill = {
  action: 'fill'
  target: string
  value: string
}

type AICommand = path | fill
