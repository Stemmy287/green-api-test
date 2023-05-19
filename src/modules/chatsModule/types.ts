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

export type SendMessageType = {
	chatId: string
	message: string
}

export type NotificationType = {
	receiptId: number
	body: NotificationBodyType
}

export type NotificationBodyType = {
	typeWebhook: string
	instanceData: NotificationInstanceDataType
	timestamp: number
	idMessage: string
	senderData: NotificationSenderDataType
	messageData: NotificationMessageDataType
}

export type NotificationInstanceDataType = {
	idInstance: number,
	wid:string,
	typeInstance: string
}

export type NotificationSenderDataType = {
	chatId: string,
	sender: string,
	senderName: string
}

export type NotificationMessageDataType = {
	typeMessage: string
	textMessageData: {
		textMessage: string
	}
}
