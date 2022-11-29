import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { Button, Label, TextInput } from 'flowbite-react'

export const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const { status } = useSelector((state) => state.auth)
	const isAuth = useSelector(checkIsAuth)
	const dispatch = useDispatch()
	const navigate = useNavigate()



	/* useEffect(() => {
		if (status) toast(status)
		if (isAuth) navigate('/')
	}, [status, isAuth, navigate]) */



	const handleSubmit = () => {
		try {
			dispatch(loginUser({ username, password }))
		} catch (error) {
			console.log(error)
		}
	}




	return (
		<>

			<form
				onSubmit={(e) => e.preventDefault()}
				className="flex flex-col gap-4 justify-center items-center mx-auto mt-40 ">
				<h1 className='text-lg text-black text-center'>Авторизация</h1>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="email1"
							value="Имя пользователя"
						/>
					</div>
					<TextInput
						id="email1"
						type="text"
						placeholder="username"
						required={true}
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label
							htmlFor="password1"
							value="Пароль"

						/>
					</div>
					<TextInput
						id="password1"
						type="password"
						required={true}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>



				<Button
					type="submit"
					onClick={handleSubmit}
				>
					Войти
				</Button>
			</form>

		</>
	)
}