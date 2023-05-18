import React, { useEffect } from 'react'
import 'app/App.scss'
import { Pages } from 'pages'
import { useAppDispatch, useAppSelector } from 'hooks'
import { isInitializedSelector, setIsInitialized } from 'app'
import { Preloader } from 'common/components/Preloader/Preloader'
import { loginTC } from 'modules/loginModule'

export const App = () => {

	const dispatch = useAppDispatch()

	const isInitialized = useAppSelector(isInitializedSelector)

	useEffect(() => {
		const instanceData = localStorage.getItem('instanceData')
		if (instanceData) {
			dispatch(loginTC(JSON.parse(instanceData)))
		} else {
			dispatch(setIsInitialized())
		}
	}, [dispatch])

	if (!isInitialized) {
		return <Preloader/>
	}

	return <Pages />
}