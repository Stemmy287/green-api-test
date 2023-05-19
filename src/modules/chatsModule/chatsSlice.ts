import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { chatsApi, ChatType, SendMessageType } from 'modules/chatsModule'
import { AppRootStateType } from 'store'
import { InstanceDataType } from 'modules/loginModule'
import { loadFromLocalStorage } from 'common/utils'
import { setIsError } from 'app/appSlice'


export const createChat = createAsyncThunk('chats/createChat', async (param: number, {
	dispatch,
	getState
}) => {

	const state = getState() as AppRootStateType
	const instanceData = state.login.instanceData as InstanceDataType

	try {
		const res = await chatsApi.checkNumber(param, instanceData)
		if (res.existsWhatsapp) {
			const index = state.chats.chats.findIndex(chat => chat.phoneNumber === param)
			 if (index === -1) {
				 return param
			 }
			dispatch(setIsError('аккаунта с таким номером уже добавлен в список'))
		} else {
			dispatch(setIsError('аккаунта с таким номером не существует'))
		}
	} catch (err) {
		dispatch(setIsError('Ошибка'))
	}
})

export const fetchMessages = createAsyncThunk('chats/fetchMessages', async (param: string, {
	rejectWithValue,
	getState
}) => {

	const state = getState() as AppRootStateType
	const instanceData = state.login.instanceData as InstanceDataType

	try {
		const res = await chatsApi.fetchMessages(param + '@c.us', instanceData)
		return { phoneNumber: param, messages: res.reverse() }
	} catch (err) {
		return rejectWithValue(null)
	}
})

export const sendMessage = createAsyncThunk('chats/sendMessage', async (param: SendMessageType, {
	rejectWithValue,
	getState
}) => {
	const state = getState() as AppRootStateType
	const instanceData = state.login.instanceData as InstanceDataType

	try {
		await chatsApi.sendMessage(param, instanceData)
		return param
	} catch (err) {
		return rejectWithValue(err)
	}
})

export const getMessage = createAsyncThunk('chats/getMessage', async (param, {
	rejectWithValue,
	getState
}) => {
	const state = getState() as AppRootStateType
	const instanceData = state.login.instanceData as InstanceDataType

	try {
		const notification = await chatsApi.getNotification(instanceData)
		const result = await chatsApi.deleteNotification(notification.receiptId, instanceData)
		if (result && notification.body.messageData.textMessageData.textMessage) {
			return {
				message: notification.body.messageData.textMessageData.textMessage,
				chatId: notification.body.senderData.chatId,
				type: notification.body.typeWebhook
			}
		} else {
			rejectWithValue(result)
		}
	} catch (e) {
		rejectWithValue(false)
	}
})

const chats = loadFromLocalStorage('chats') || []

export const slice = createSlice({
	name: 'chats',
	initialState: {
		chats: chats as ChatType[],
		currentChat: {} as ChatType
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(createChat.fulfilled, (state, action) => {
			if (action.payload) {
					state.chats.unshift({ phoneNumber: action.payload, messages: [] })
					localStorage.setItem('chats', JSON.stringify(state.chats))
			}
		})
		builder.addCase(fetchMessages.fulfilled, (state, action) => {
			state.currentChat = { phoneNumber: +action.payload.phoneNumber, messages: action.payload.messages }
		})
		builder.addCase(sendMessage.fulfilled, (state, action) => {
			state.currentChat.messages.push({
				...state.currentChat.messages[0],
				textMessage: action.payload.message,
				type: 'outgoing'
			})
		})
		builder.addCase(getMessage.fulfilled, (state, action) => {
			if (action.payload && state.currentChat.phoneNumber + '@c.us' === action.payload.chatId) {
				state.currentChat.messages.push({
					...state.currentChat.messages[0],
					textMessage: action.payload.message,
					type: action.payload.type === 'incomingMessageReceived' ? 'incoming' : 'outgoing'
				})
			}
		})
	}
})
export const chatsSlice = slice.reducer