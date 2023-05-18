import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { isLoggedInSelector } from 'modules/loginModule'
import { Navigate } from 'react-router-dom'
import { PATH } from 'common/constants'
import s from './Chats.module.scss'
import { Button, Input } from 'common/components'
import { createChatTC, fetchMessages } from 'modules/chatsModule/chatsSlice'
import { chatsSelector, currentChatSelector } from 'modules/chatsModule/chatsSelectors'
import { Chat } from 'modules/chatsModule/components/Chat/Chat'

export const Chats = () => {

	const isLoggedIn = useAppSelector(isLoggedInSelector)

	const chats = useAppSelector(chatsSelector)
	const currentChat = useAppSelector(currentChatSelector)

	const dispatch = useAppDispatch()

	const [value, setValue] = useState('')

	if (!isLoggedIn) {
		return <Navigate to={PATH.LOGIN} />
	}

	const onCreateChatHandler = () => {
		dispatch(createChatTC(+value))
	}

	const onClickChatHandler = (phoneNumber: number) => {
		dispatch(fetchMessages(phoneNumber.toString()))
	}

	return (
		<div className={s.container}>
			<div className={s.chats}>
				<div className={s.addChat}>
					<Input
						value={value}
						allBorder
						placeholder="номер телефона"
						onChange={(e) => setValue(e.currentTarget.value)}
					/>
					<div>
						<Button title={'Создать чат'} callback={onCreateChatHandler} />
					</div>
				</div>
				<div className={s.chatsList}>
					{chats?.map(chat =>
						<div key={chat.phoneNumber} onClick={() => onClickChatHandler(chat.phoneNumber)}>
							<Chat mobileNumber={chat.phoneNumber} currentChatNumber={currentChat.phoneNumber} />
						</div>)}
				</div>
			</div>
			<div className={s.chatWindow}>
				<div className={s.messages}>
					{currentChat.messages?.length
						? currentChat.messages?.map(mes => <div>{mes.textMessage}</div>)
						: <span className={s.emptyMessage}>сообщений пока нет</span>
					}

				</div>
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
			</div>
		</div>
	)
}

