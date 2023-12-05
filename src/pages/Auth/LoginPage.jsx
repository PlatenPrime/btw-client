import React, { useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, InputBlock, PageBTW, TextBlock } from '../../components'
import useAuthStore from './authStore';
import axios from "../../utils/axios"
import { useNavigate } from 'react-router-dom';
import PageAuthBTW from '../../components/UI/Page/PageAuthBTW';

export default function LoginPage() {


	const { setUser, user, token, login, logout } = useAuthStore();
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const [isLogining, setIsLogining] = useState(false);
	const [isLogouting, setIsLogouting] = useState(false);
	const [error, setError] = useState(null);


	console.log(user);
	console.log(token);







	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};


	const handleLogin = async () => {
		try {
			setIsLogining(true)

			const user = await login(formData)

			if (user) { navigate("/") }

			if (!user) {
				setError("Невдала спроба авторизації")
			}



		} catch (error) {
			console.error('Login error:', error);
		} finally {
			setIsLogining(false)
		}
	};



	const handleLogout = async () => {
		try {
			setIsLogouting(true)

			await logout()


		} catch (error) {
			console.error('Login error:', error);
		} finally {
			setIsLogouting(false)
		}
	};




	return (
		<PageBTW
			className="space-y-4"
		>
			<HeaderBlock
				className="border border-white shadow-md shadow-white"
			>
				Авторизация
			</HeaderBlock>



			<CardBlock
				className=" w-full h-full  flex flex-col items-center justify-center"
			>





				<CardBlock
					className="space-y-4 p-36 border rounded-3xl"
				>

					<CardBlock
						className="flex space-x-2 items-center justify-end"
					>

						<TextBlock>
							Логін:
						</TextBlock>

						<InputBlock
							type="text"
							name="username"
							value={formData.username}
							onChange={handleChange}

						/>
					</CardBlock>



					<CardBlock
						className="flex space-x-2 items-center justify-end"
					>

						<TextBlock>
							Логин:
						</TextBlock>

						<InputBlock
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
						/>

					</CardBlock>


					<ButtonBlock
						onClick={handleLogin}
						className="green-b w-full flex items-center justify-center"
						disabled={!formData.username}
						disabledClassName="w-full"
					>
						Вхід
					</ButtonBlock>





					<TextBlock>
						{error}
					</TextBlock>


				</CardBlock>


			</CardBlock>





		</PageBTW>
	)
}
