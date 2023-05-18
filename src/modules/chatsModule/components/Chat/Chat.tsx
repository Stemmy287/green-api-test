import React from 'react'
import s from './Chat.module.scss'
import defaultAva from 'common/images/defaultAva.jpg'

type PropsType = {
	mobileNumber: number
	currentChatNumber: number
}

export const Chat = ({ mobileNumber, currentChatNumber }: PropsType) => {
	return (
		<div className={mobileNumber === currentChatNumber ? `${s.container} ${s.current}` : s.container}>
			<img src={defaultAva} alt="user ava" />
			<div className={s.info}>
				<span className={s.mobileNumber}>
					{mobileNumber}
				</span>
				<span className={s.messageEmpty}>
					сообщений пока нет
				</span>
			</div>
		</div>
	)
}
