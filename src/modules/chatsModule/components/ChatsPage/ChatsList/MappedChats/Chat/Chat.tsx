import React from 'react'
import s from './Chat.module.scss'
import defaultAva from 'common/images/defaultAva.jpg'
import { useAppSelector } from 'hooks'
import { currentChatSelector } from 'modules/chatsModule'

type PropsType = {
	mobileNumber: number
}
export const Chat = ({ mobileNumber }: PropsType) => {

	const currentChat = useAppSelector(currentChatSelector)

	return (
		<div className={currentChat.phoneNumber === mobileNumber ? `${s.container} ${s.current}` : s.container}>
			<img src={defaultAva} alt="user ava" />
			<div className={s.info}>
				<span className={s.mobileNumber}>
					{mobileNumber}
				</span>
			</div>
		</div>
	)
}
