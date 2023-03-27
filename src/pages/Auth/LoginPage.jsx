import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import ButtonBlock from '../../components/blocks/ButtonBlock'
import InputBlock from '../../components/blocks/InputBlock'
import { Vortex } from 'react-loader-spinner'
import PageAuthBTW from '../../components/UI/Page/PageAuthBTW'









export const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(true)


	const { status } = useSelector((state) => state.auth)
	const isAuth = useSelector(checkIsAuth)
	const dispatch = useDispatch()
	const navigate = useNavigate()



	const checkingAuth = async () => {
		try {
			setIsLoading(true)
			if (isAuth)  navigate('/')
			setIsLoading(false)

		} catch (error) {
			console.log(error)
		}
	}




	useEffect(() => {

		if (status) toast(status)

		checkingAuth()

	}, [status, checkingAuth])






	const handleSubmit = () => {
		try {
			dispatch(loginUser({ username, password }))
		} catch (error) {
			console.log(error)
		}
	}




	return (
		<PageAuthBTW>

			{isLoading ?

				<Vortex
					visible={true}
					height="200"
					width="200"
					ariaLabel="vortex-loading"
					wrapperStyle={{}}
					wrapperClass="vortex-wrapper"
					colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
				/>

				:

				<form

					onSubmit={(e) => e.preventDefault()}

					className="flex flex-col gap-4 justify-center items-center mx-auto  "

				>

					<h1
						className='text-lg text-black text-center'
					>
						Авторизация
					</h1>

					<div>
						<div className="mb-2 block">
							Имя пользователя:
						</div>

						<InputBlock

							type="text"
							placeholder="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>

					</div>


					<div>

						<div className="mb-2 block">

							Пароль:

						</div>


						<InputBlock
							id="password1"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>


					</div>



					<ButtonBlock
					className="success-c w-full"
						onClick={handleSubmit}
					>
						Войти
					</ButtonBlock>

				</form>

			}


		</PageAuthBTW>
	)
}