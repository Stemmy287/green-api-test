import React from 'react'
import s from './ChatWindow.module.scss'
import { Button, Input } from 'common/components'
import { useAppSelector } from 'hooks'
import { currentChatSelector } from 'modules/chatsModule'
import { MappedMessages } from 'modules/chatsModule'
export const ChatWindow = () => {

	const currentChat = useAppSelector(currentChatSelector)

	return (
		<div className={s.chatWindow}>
			{currentChat.phoneNumber ? (
					<>
						<MappedMessages currentChat={currentChat}/>
						<div className={s.addMessage}>
							<div className={s.input}>
								<Input
									placeholder="Введите сообщение"
									allBorder
								/>
							</div>
							<div>
								<Button title="Отправить" />
							</div>
						</div>
					</>
				) :
				(<span className={s.noChats}>Выберите чат из списка или создайте новый</span>)
			}


		</div>
	)
}
