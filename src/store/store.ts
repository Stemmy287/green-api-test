import { AnyAction, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk'
import { loginReducer } from 'modules/loginModule'
import { chatsSlice } from 'modules/chatsModule'
import { appReducer } from 'app'

const rootReducer = combineReducers({
	app: appReducer,
	login: loginReducer,
	chats: chatsSlice
})
export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

//types
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>