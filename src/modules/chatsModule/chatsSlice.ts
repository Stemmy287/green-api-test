import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { chatsApi, ChatType, SendMessageType } from 'modules/chatsModule'
import { AppRootStateType } from 'store'
import { InstanceDataType } from 'modules/loginModule'
import { loadFromLocalStorage } from 'common/utils'


export const createChat = createAsyncThunk('chats/createChat', async (param: number, {
	rejectWithValue,
	getState
}) => {

	const state = getState() as AppRootStateType
	const instanceData = state.login.instanceData as InstanceDataType

	try {
		const res = await chatsApi.checkNumber(param, instanceData)
		if (res.existsWhatsapp) {
			return param
		} else {
			return rejectWithValue(false)
		}
	} catch (err) {
		return rejectWithValue(false)
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
			state.chats.unshift({ phoneNumber: action.payload, messages: [] })
			localStorage.setItem('chats', JSON.stringify(state.chats))
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
	}
})
export const chatsSlice = slice.reducer