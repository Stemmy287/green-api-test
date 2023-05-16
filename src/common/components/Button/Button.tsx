import React, { FC } from 'react'
import s from './button.module.scss'

type ButtonPropsType = {
	callback?: () => void
	title: string
	disabled?: boolean
}

export const Button: FC<ButtonPropsType> = ({
																							callback,
																							title,
																							disabled
																						}) => {
	return (
		<button
			className={s.button}
			onClick={callback}
			disabled={disabled}
		>
			{title}
		</button>
	)
}

