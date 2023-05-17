import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PATH } from 'common/constants'
import { Login } from 'modules/loginModule'
import { BaseLayout } from 'pages'
import { Chats } from 'modules/chatsModule'

export const Pages = () => {
	return (
		<Routes>
			<Route element={<BaseLayout />}>
				<Route path={PATH.MAIN} element={<Navigate to={PATH.CHATS} />} />
				<Route path={PATH.CHATS} element={<Chats />} />
				<Route path={PATH.LOGIN} element={<Login />} />
			</Route>
		</Routes>
	)
}
