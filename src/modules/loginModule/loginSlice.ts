import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InstanceDataType, loginApi } from 'modules/loginModule'
import { setIsError, setIsInitialized } from 'app/appSlice'

export const login = createAsyncThunk('login/login', async (param: InstanceDataType, {
	dispatch
}) => {
	try {
		const res = await loginApi.checkInstance(param)
		if (res.stateInstance === 'authorized') {
			return param
		} else {
			dispatch(setIsError(res.stateInstance))
		}
	} catch (err) {
		dispatch(setIsError('Проверьте сотояние инстанса'))
} finally {
		dispatch(setIsInitialized())
	}
})

const slice = createSlice({
	name: 'login',
	initialState: {
		instanceData: null as InstanceDataType | null,
		isLoggedIn: false,
	},
	reducers: {
		removeInstanceData(state) {
			localStorage.removeItem('instanceData')
			state.instanceData = null
			state.isLoggedIn = false
		}
	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (action.payload) {
				state.instanceData = action.payload
				localStorage.setItem('instanceData', JSON.stringify(action.payload))
				state.isLoggedIn = true
			}
		})
	}
})
export const {removeInstanceData } = slice.actions
export const loginReducer = slice.reducer