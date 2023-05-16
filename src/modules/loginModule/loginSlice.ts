import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { InstanceDataType } from 'modules/loginModule'
import { loadFromLocalStorage } from 'common/utils'

const instanceDataFromLocalStorage = loadFromLocalStorage('instanceData')

const slice = createSlice({
	name: 'login',
	initialState: {
		instanceData: instanceDataFromLocalStorage as InstanceDataType
	},
	reducers: {
		setInstanceData(state, action: PayloadAction<InstanceDataType>) {
			state.instanceData = action.payload
			localStorage.setItem('instanceData', JSON.stringify(action.payload))
		}
	}
})

export const {setInstanceData} = slice.actions
export const loginReducer = slice.reducer