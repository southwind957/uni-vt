type PacketType = 'auth' | 'chat' | 'heartbeat' | 'close' | 'system'

interface ClientAuthPacket {
  type: 'auth'
  userId: string
  token?: string
}

interface ClientChatPacket {
  type: 'chat'
  to: string
  content: string
  timestamp: number
}

interface ServerChatPacket {
  from: string
  content: string
  timestamp: number
  serverMsgId?: string
  clientMsgId?: string
}

type IncomingPacket = ServerChatPacket | any
type OutgoingPacket = ClientAuthPacket | ClientChatPacket | any
