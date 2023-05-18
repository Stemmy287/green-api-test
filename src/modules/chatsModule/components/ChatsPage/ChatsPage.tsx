import React from 'react'
import { useAppSelector } from 'hooks'
import { isLoggedInSelector } from 'modules/loginModule'
import { Navigate } from 'react-router-dom'
import { PATH } from 'common/constants'
import s from './ChatsPage.module.scss'
import { ChatsList } from 'modules/chatsModule'
import { ChatWindow } from 'modules/chatsModule'

export const ChatsPage = () => {

	const isLoggedIn = useAppSelector(isLoggedInSelector)

	if (!isLoggedIn) {
		return <Navigate to={PATH.LOGIN} />
	}

	return (
		<div className={s.container}>
			<ChatsList />
			<ChatWindow />
		</div>
	)
}

