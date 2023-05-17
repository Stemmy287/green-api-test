import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InstanceDataType, loginApi } from 'modules/loginModule'

export const loginTC = createAsyncThunk('login/loginTC', async (param: InstanceDataType, {
	dispatch,
	rejectWithValue
}) => {
	try {
		const res = await loginApi.login(param)
		if (res.stateInstance === 'authorized') {
			dispatch(setInstanceData(param))
			dispatch(setIsLoggedIn(true))
		} else {
			return res.stateInstance
		}
	} catch (e) {
		return rejectWithValue(null)
	} finally {
		dispatch(setIsInitialized())
	}
})

const slice = createSlice({
	name: 'login',
	initialState: {
		instanceData: null as InstanceDataType | null,
		isLoggedIn: false,
		isInitialized: false
	},
	reducers: {
		setIsLoggedIn(state, action: PayloadAction<boolean>) {
			state.isLoggedIn = action.payload
		},
		setIsInitialized(state) {
			state.isInitialized = true
		},
		setInstanceData(state, action: PayloadAction<InstanceDataType>) {
			state.instanceData = action.payload
			localStorage.setItem('instanceData', JSON.stringify(action.payload))
		},
		removeInstanceData(state) {
			localStorage.removeItem('instanceData')
			state.instanceData = null
			state.isLoggedIn = false
		}
	}
})

export const {
	setInstanceData,
	removeInstanceData,
	setIsLoggedIn,
	setIsInitialized
} = slice.actions
export const loginReducer = slice.reducer