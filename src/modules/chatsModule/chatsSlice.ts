import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chatsApi, MessageType } from 'modules/chatsModule'
import { AppRootStateType } from 'store'
import { InstanceDataType } from 'modules/loginModule'
import { ChatType } from 'modules/chatsModule'
import { loadFromLocalStorage } from 'common/utils'


export const createChatTC = createAsyncThunk('chats/createChatTC', async (param: number, {
	dispatch,
	rejectWithValue,
	getState
}) => {

	const state = getState() as AppRootStateType
	const instanceData = state.login.instanceData as InstanceDataType

	try {
		const res = await chatsApi.checkNumber(param, instanceData)
		if (res.existsWhatsapp) {
			dispatch(addChat(param))
		}
	} catch (e) {
		return rejectWithValue(false)
	}
})

export const fetchMessages = createAsyncThunk('chats/fetchMessages', async (param: string, {
	dispatch,
	rejectWithValue,
	getState
}) => {

	const state = getState() as AppRootStateType
	const instanceData = state.login.instanceData as InstanceDataType

	try {
		const res = await chatsApi.fetchMessages(param + '@c.us', instanceData)
		dispatch(addCurrentChat({phoneNumber: param, messages: res.reverse()}))

	} catch (e) {
		return rejectWithValue(null)
	}

})

const chats = loadFromLocalStorage('chats') || []

export const slice = createSlice({
	name: 'chats',
	initialState: {
		chats: chats as ChatType[],
		currentChat: {} as ChatType
	},
	reducers: {
		addChat(state, action: PayloadAction<number>) {
			state.chats.unshift({phoneNumber: action.payload, messages: []})
			localStorage.setItem('chats', JSON.stringify(state.chats))
		},
		addCurrentChat(state, action: PayloadAction<{phoneNumber: string, messages: MessageType[]}>) {
			state.currentChat = {phoneNumber: +action.payload.phoneNumber, messages: action.payload.messages}
		}
	}
})

export const {addChat, addCurrentChat} = slice.actions
export const chatsSlice = slice.reducer