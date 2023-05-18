import React from 'react'
import { Chat } from 'modules/chatsModule'
import { useAppDispatch, useAppSelector } from 'hooks'
import { chatsSelector } from 'modules/chatsModule'
import { fetchMessages } from 'modules/chatsModule'
export const MappedChats = () => {

	const chats = useAppSelector(chatsSelector)

	const dispatch = useAppDispatch()

	const onClickChatHandler = (phoneNumber: number) => {
		dispatch(fetchMessages(phoneNumber.toString()))
	}

	return (
		<>
			{chats?.map(chat =>
				<div key={chat.phoneNumber} onClick={() => onClickChatHandler(chat.phoneNumber)}>
					<Chat mobileNumber={chat.phoneNumber} />
				</div>)}
		</>
	)
}
