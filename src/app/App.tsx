import React, { useEffect } from 'react'
import 'app/App.scss'
import { Pages } from 'pages'
import { useAppDispatch, useAppSelector } from 'hooks'
import { isInitializedSelector, loginTC, setIsInitialized } from 'modules/loginModule'

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
		return <h1>...initialize</h1>
	}

	return <Pages />
}