import React from 'react'
import s from './Login.module.scss'
import { Button, Input } from 'common/components'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { InstanceDataType, isLoggedInSelector, loginTC } from 'modules/loginModule'
import { useAppDispatch, useAppSelector } from 'hooks'
import { PATH } from 'common/constants'
import { Navigate } from 'react-router-dom'

export const Login = () => {

	const dispatch = useAppDispatch()

	const isLoggedIn = useAppSelector(isLoggedInSelector)

	const schema = yup.object().shape({
		idInstance: yup.string().required('field required'),
		apiTokenInstance: yup.string().required()
	})

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<InstanceDataType>({
		resolver: yupResolver(schema)
	})
	const onSubmit: SubmitHandler<InstanceDataType> = data => {
		dispatch(loginTC(data))
	}

	if (isLoggedIn) {
		return <Navigate to={PATH.CHATS} />
	}

	return (
		<div className={s.container}>
			<div className={s.info}>
						<span>
							Для использования приложения вам нужно зарегистрироваться на
							<a
								href="https://green-api.com/"
								target="_blank"
								rel="noreferrer"
							>
								{' green-api.com '}
							</a>
						 	, создать инстанс и авторизовать его
						</span>
				<span><b>idInstance</b> и <b>apiTokenInstance</b> введите ниже в форму</span>
			</div>
			<form className={s.form} onSubmit={handleSubmit(onSubmit)}>
				<Input
					title={'idInstance'}
					register={register}
					name={'idInstance'}
					error={errors.idInstance?.message}
				/>
				<Input
					title={'apiTokenInstance'}
					register={register}
					name={'apiTokenInstance'}
					error={errors.apiTokenInstance?.message}
				/>
				<Button title={'Войти'} disabled={!!errors.idInstance || !!errors.apiTokenInstance} />
			</form>
		</div>
	)
}