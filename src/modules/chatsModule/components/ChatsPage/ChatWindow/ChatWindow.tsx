import React, { useState } from 'react'
import s from './ChatWindow.module.scss'
import { Button, Input } from 'common/components'
import { useAppDispatch, useAppSelector } from 'hooks'
import { currentChatSelector, MappedMessages, sendMessage } from 'modules/chatsModule'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import 'overlayscrollbars/overlayscrollbars.css'

export const ChatWindow = () => {

	const currentChat = useAppSelector(currentChatSelector)

	const dispatch = useAppDispatch()

	const [value, setValue] = useState('')

	const onSendMessageHandler = () => {
		dispatch(sendMessage({ chatId: currentChat.phoneNumber + '@c.us', message: value }))
	}

	return (
		<div className={s.chatWindow}>
			{currentChat.phoneNumber ? (
					<>
						<OverlayScrollbarsComponent className={s.scroll} defer>
							<div className={s.messages}>
								<MappedMessages currentChat={currentChat} />
							</div>
						</OverlayScrollbarsComponent>
						<div className={s.addMessage}>
							<div className={s.input}>
								<Input
									placeholder="Введите сообщение"
									allBorder
									value={value}
									onChange={(e) => setValue(e.currentTarget.value)}
								/>
							</div>
							<div>
								<Button title="Отправить" callback={onSendMessageHandler} />
							</div>
						</div>
					</>
				) :
				(<span className={s.noChats}>Выберите чат из списка или создайте новый</span>)
			}
		</div>
	)
}
