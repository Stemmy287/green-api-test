import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const slice = createSlice({
	name: 'app',
	initialState: {
		isInitialized: false,
		isError: null as null | string
	},
	reducers: {
		setIsInitialized(state) {
			state.isInitialized = true
		},
		setIsError(state,action: PayloadAction<null | string>) {
			state.isError = action.payload
		}
	}
})
export const {setIsInitialized,setIsError } = slice.actions
export const appReducer = slice.reducer