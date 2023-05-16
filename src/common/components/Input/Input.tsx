import React from 'react'
import s from './input.module.scss'
import { UseFormRegister } from 'react-hook-form'

type Props = {
	title?: string
	name: string
	error?: string
	register: UseFormRegister<any>
}
export const Input = ({ title, register, name, error }: Props) => {

	return (
		<div className={s.container}>
			{title && <span className={s.title}>{title}</span>}
			<input
				className={s.input}
				{...register(name)}
			/>
			{error && <span className={s.error}>{error}</span>}
		</div>
	)
}


