import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { isLoggedInSelector } from 'modules/loginModule'
import { Navigate } from 'react-router-dom'
import { PATH } from 'common/constants'
import s from './Chats.module.scss'
import { Button, Input } from 'common/components'
import { createChatTC } from 'modules/chatsModule/chatsSlice'
import { chatsSelector } from 'modules/chatsModule/chatsSelectors'

export const Chats = () => {

	const isLoggedIn = useAppSelector(isLoggedInSelector)
  const dispatch = useAppDispatch()

	const [value, setValue] = useState('')

	if (!isLoggedIn) {
		return <Navigate to={PATH.LOGIN} />
	}

	const onCLickHandler = () => {
		dispatch(createChatTC(+value))
	}

	return (
		<div className={s.container}>
			<div className={s.chatsList}>
				<div className={s.addChat}>
					<Input
						value={value}
						allBorder
						placeholder="номер телефона"
						onChange={(e) => setValue(e.currentTarget.value)}
					/>
					<div>
						<Button title={'Создать чат'} callback={onCLickHandler}/>
					</div>
				</div>
			</div>
			<div className={s.chatWindow}>
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

