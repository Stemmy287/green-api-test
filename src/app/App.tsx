import React, { useEffect } from 'react'
import './App.scss'
import { Pages } from 'pages'
import { useAppDispatch, useAppSelector } from 'hooks'
import { isErrorSelector, isInitializedSelector } from 'app/appSelectors'
import { setIsInitialized } from 'app/appSlice'
import { Preloader } from 'common/components'
import { login } from 'modules/loginModule'
import { ErrorBar } from 'common/components/ErrorBar/ErrorBar'

export const App = () => {

	const dispatch = useAppDispatch()

	const isInitialized = useAppSelector(isInitializedSelector)
	const isError = useAppSelector(isErrorSelector)

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

	return (
		<>
			<Pages />
			{isError && <ErrorBar/>}
		</>
	)
}