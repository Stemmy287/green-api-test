import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import s from './input.module.scss'
import { UseFormRegister } from 'react-hook-form'

type Props = {
	title?: string
	error?: string
	allBorder?: boolean
	register?: UseFormRegister<any>
}

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement>

export const Input = ({ title, register, error, allBorder, ...restProps}: Props & DefaultInputPropsType) => {

	return (
		<div className={s.container}>
			{title && <span className={s.title}>{title}</span>}
			<input
				className={allBorder ? `${s.input} ${s.allBorder}` : s.input}
				{...register && { ...register(restProps.name || '') }}
				{...restProps}
			/>
			{error && <span className={s.error}>{error}</span>}
		</div>
	)
}


