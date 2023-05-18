export type ChatType = {
	phoneNumber: number,
	messages: MessageType[]
}

export type MessageType = {
	type: 'outgoing' | 'incoming'
	timestamp: number
	idMessage: string
	statusMessage: 'pending' | 'sent' | 'delivered' | 'read'
	typeMessage:
		'textMessage'
		| 'imageMessage '
		| 'videoMessage'
		| 'documentMessage'
		| 'audioMessage'
		| 'locationMessage'
		| 'contactMessage'
		| 'extendedTextMessage'
	chatId: string
	senderId: string
	senderName: string
	textMessage: string
	downloadUrl: string
	caption: string
}