import React from 'react'
import s from './Message.module.scss'

type PropsType = {
	message: string
	typeMessage: 'outgoing' | 'incoming'
}

export const Message = ({ message, typeMessage }: PropsType) => {
	return (
		<div className={typeMessage === 'incoming' ? `${s.container} ${s.incoming}` : s.container}>{message}</div>
	)
}
