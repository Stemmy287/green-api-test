import { AppRootStateType } from 'store'

export const instanceDataSelector = (state: AppRootStateType) => state.login.instanceData
export const isLoggedInSelector = (state: AppRootStateType) => state.login.isLoggedIn
export const isInitializedSelector = (state: AppRootStateType) => state.login.isInitialized