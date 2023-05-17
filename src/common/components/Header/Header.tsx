import React from 'react'
import s from './Header.module.scss'
import { useAppDispatch, useAppSelector } from 'hooks'
import { isLoggedInSelector, removeInstanceData } from 'modules/loginModule'

export const Header = () => {

	const isLoggedIn = useAppSelector(isLoggedInSelector)

	const dispatch = useAppDispatch()
	const onLogoutHandler = () => {
		dispatch(removeInstanceData())
	}

	return (
		<header className={s.header}>
			<h3>Green-api-test</h3>
			{isLoggedIn && <h3 className={s.logout} onClick={onLogoutHandler}>Выйти</h3>}
		</header>
	)
}
