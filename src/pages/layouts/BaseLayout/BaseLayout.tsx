import React from 'react'
import s from './BaseLayout.module.scss'
import { Header } from 'common/components/Header/Header'
import { Outlet } from 'react-router-dom'

export const BaseLayout = () => {
	return (
		<>
			<Header/>
			<div className={s.container}><Outlet/></div>
		</>
	)
}
