import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'app',
	initialState: {
		isInitialized: false
	},
	reducers: {
		setIsInitialized(state) {
			state.isInitialized = true
		}
	}
})
export const {setIsInitialized} = slice.actions
export const appReducer = slice.reducer