import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PATH } from 'common/constants'
import { Login } from 'modules/loginModule'
export const Pages = () => {
	return (
		<Routes>
			<Route path={PATH.MAIN} element={<Login />} />
		</Routes>
	)
}
