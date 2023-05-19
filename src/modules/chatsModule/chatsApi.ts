import { instance } from 'common/constants'
import { InstanceDataType } from 'modules/loginModule'
import { AxiosResponse } from 'axios'
import { MessageType, NotificationType, SendMessageType } from 'modules/chatsModule/types'
export const chatsApi = {
	checkNumber(phoneNumber: number, instanceData: InstanceDataType) {
		const { idInstance, apiTokenInstance } = instanceData
		return instance.post<'', AxiosResponse<{ existsWhatsapp: boolean }>, { phoneNumber: number }>
		(`waInstance${idInstance}/CheckWhatsapp/${apiTokenInstance}`, { phoneNumber })
			.then(res => res.data)
	},
	fetchMessages(chatId: string, instanceData: InstanceDataType) {
		const { idInstance, apiTokenInstance } = instanceData
		return instance.post<'', AxiosResponse<MessageType[]>, { chatId: string }>
		(`waInstance${idInstance}/GetChatHistory/${apiTokenInstance}`, { chatId })
			.then(res => res.data)
	},
	sendMessage(messageData: SendMessageType, instanceData: InstanceDataType) {
		const { idInstance, apiTokenInstance } = instanceData
		return instance.post<'', AxiosResponse, SendMessageType>
		(`waInstance${idInstance}/SendMessage/${apiTokenInstance}`, messageData)
	},
	getNotifications(instanceData: InstanceDataType) {
		const { idInstance, apiTokenInstance } = instanceData
		return instance.get
			< AxiosResponse < NotificationType >>
			(`waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`)
				.then(res => res.data)
	},
	deleteNotifications(receiptId: string, instanceData: InstanceDataType) {
		const { idInstance, apiTokenInstance } = instanceData
		return instance.delete< { result: boolean } >
			(`waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${receiptId}`)
				.then(res => res.data)
	}
}