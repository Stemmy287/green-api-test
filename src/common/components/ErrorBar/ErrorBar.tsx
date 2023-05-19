import React, { useEffect } from 'react'
import s from 'common/components/ErrorBar/errorBar.module.scss'
import { useAppSelector } from 'hooks/useAppSelector'

import { useAppDispatch } from 'hooks/useAppDispatch'

import { ReactComponent as WarningIcon } from 'common/icons/warning-circle-svgrepo-com.svg'
import { ReactComponent as CloseIcon } from 'common/icons/close.svg'
import { isErrorSelector } from 'app/appSelectors'
import { setIsError } from 'app/appSlice'

export const ErrorBar = () => {

	const error = useAppSelector(isErrorSelector)

	const dispatch = useAppDispatch()

	const onClose = () => {
		dispatch(setIsError(null ))
	}

	useEffect(() => {
		const id = setTimeout(() => {
			onClose()
		}, 5000)
		return () => {
			clearTimeout(id)
		}
	})

	return (
		<div className={s.error}>
			<WarningIcon />
			<span>{error}</span>
			<div className={s.close_error_bar} onClick={onClose}>
				<CloseIcon />
			</div>
		</div>
	)
}

