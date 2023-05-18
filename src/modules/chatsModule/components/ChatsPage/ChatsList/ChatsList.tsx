import React, { useState } from 'react'
import s from './ChatsList.module.scss'
import { Button, Input } from 'common/components'
import { createChat } from 'modules/chatsModule'
import { useAppDispatch } from 'hooks'
import { MappedChats } from 'modules/chatsModule'

export const ChatsList = () => {

	const [value, setValue] = useState('')

	const dispatch = useAppDispatch()
	const onCreateChatHandler = () => {
		dispatch(createChat(+value))
	}

	return (
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
			<MappedChats />
		</div>
	)
}
