import { AppRootStateType } from 'store'

export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized
export const isErrorSelector = (state: AppRootStateType) => state.app.isError