import { AppRootStateType } from 'store'

export const chatsSelector = (state: AppRootStateType) => state.chats.chats
export const currentChatSelector = (state: AppRootStateType) => state.chats.currentChat