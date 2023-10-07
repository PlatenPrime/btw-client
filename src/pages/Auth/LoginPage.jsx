import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'


import PageAuthBTW from '../../components/UI/Page/PageAuthBTW'
import { ButtonBlock, InputBlock, TextBlock, CardBlock } from "../../components";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';










export const LoginPage = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false);



	const { status } = useSelector((state) => state.auth)
	const isAuth = useSelector(checkIsAuth)
	const dispatch = useDispatch()
	const navigate = useNavigate()



	const checkingAuth = async () => {
		try {

			if (isAuth) navigate('/')


		} catch (error) {
			console.log(error)
		}
	}

	if (status) toast.info(status)


	useEffect(() => {


		checkingAuth()

	}, [checkingAuth])






	const handleSubmit = () => {
		try {
			dispatch(loginUser({ username, password }))
		} catch (error) {
			console.log(error)
		}
	}


	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};




	return (
		<PageAuthBTW>


			<CardBlock



				className="flex flex-col gap-4 justify-center items-center mx-auto p-10  "

			>

				<TextBlock
					className='text-3xl text-white text-center'
				>
					Авторизация
				</TextBlock>


				<div className=" block">
					Имя пользователя:
				</div>

				<InputBlock

					type="text"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>






				<div className=" block">

				Пароль:
					<span
						onClick={togglePasswordVisibility}
						style={{ cursor: 'pointer' }}
					>
						{showPassword ? (
							<FontAwesomeIcon icon={faEye} />
						) : (
							<FontAwesomeIcon icon={faEyeSlash} />
						)}
					</span>

				</div>


				<InputBlock
					id="password1"
					type={showPassword ? 'text' : 'password'}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>


		


				<ButtonBlock
					className="confirm-c w-full"
					onClick={handleSubmit}
				>
					Войти
				</ButtonBlock>

			</CardBlock>




		</PageAuthBTW>
	)
}