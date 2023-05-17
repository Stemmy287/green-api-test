import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { chatsApi } from 'modules/chatsModule'
import { AppRootStateType } from 'store'
import { InstanceDataType } from 'modules/loginModule'
import { ChatType } from 'modules/chatsModule'


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

export const slice = createSlice({
	name: 'chats',
	initialState: {
		chats: [] as ChatType[]
	},
	reducers: {
		addChat(state, action: PayloadAction<number>) {
			state.chats.push({phoneNumber: action.payload, messages: []})
		}
	}
})

export const {addChat} = slice.actions
export const chatsSlice = slice.reducer