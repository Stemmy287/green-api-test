import React from 'react'
import s from './MappedMessages.module.scss'
import { ChatType } from 'modules/chatsModule'

type PropsType = {
	currentChat: ChatType
}
export const MappedMessages = ({ currentChat }: PropsType) => {
	return (
		<div className={s.messages}>
			{currentChat.messages?.length
				? currentChat.messages?.map(mes => <div>{mes.textMessage}</div>)
				: <span className={s.emptyMessage}>сообщений пока нет</span>
			}
		</div>
	)
}
