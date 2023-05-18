import React from 'react'
import s from './MappedMessages.module.scss'
import { ChatType, Message } from 'modules/chatsModule'

type PropsType = {
	currentChat: ChatType
}
export const MappedMessages = ({ currentChat }: PropsType) => {
	return (
		<>
			{currentChat.messages?.length
				? currentChat.messages?.filter(mes => mes.type)
					.map(mes => <Message message={mes.textMessage} typeMessage={mes.type} />)
				: <span className={s.emptyMessage}>сообщений пока нет</span>
			}
		</>
	)
}
