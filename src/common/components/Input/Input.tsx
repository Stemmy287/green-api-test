import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import s from './input.module.scss'
import { UseFormRegister } from 'react-hook-form'

type Props = {
	title?: string
	error?: string
	register?: UseFormRegister<any>
}

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement>

export const Input = ({ title, register, error, ...restProps}: Props & DefaultInputPropsType) => {

	return (
		<div className={s.container}>
			{title && <span className={s.title}>{title}</span>}
			<input
				className={s.input}
				{...register && { ...register(restProps.name || '') }}
			/>
			{error && <span className={s.error}>{error}</span>}
		</div>
	)
}


