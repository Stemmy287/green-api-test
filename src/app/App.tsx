import React, { useEffect } from 'react'
import './App.scss'
import { Pages } from 'pages'
import { useAppDispatch, useAppSelector } from 'hooks'
import { isInitializedSelector } from 'app/appSelectors'
import { setIsInitialized } from 'app/appSlice'
import { Preloader } from 'common/components'
import { login } from 'modules/loginModule'

export const App = () => {

	const dispatch = useAppDispatch()

	const isInitialized = useAppSelector(isInitializedSelector)

	useEffect(() => {
		const instanceData = localStorage.getItem('instanceData')
		if (instanceData) {
			dispatch(login(JSON.parse(instanceData)))
		} else {
			dispatch(setIsInitialized())
		}
	}, [dispatch])

	if (!isInitialized) {
		return <Preloader/>
	}

	return <Pages />
}