import React, { useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, InputBlock, PageBTW, TextBlock } from '../../components'
import useAuthStore from './authStore';
import { useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";


export default function LoginPage() {


	const { login } = useAuthStore();
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const [isLogining, setIsLogining] = useState(false);
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false);









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


	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};



	return (
		<PageBTW
			className="space-y-4"
		>
			<HeaderBlock
				className="border border-white shadow-md shadow-white"
			>
				Авторизація
			</HeaderBlock>



			<CardBlock
				className=" w-full h-full  flex flex-col items-center justify-center"
			>





				<CardBlock
					className="space-y-4 p-36 border border-white shadow-md shadow-white rounded-3xl"
				>

					<CardBlock
						className=" space-y-2 items-center justify-center"
					>

						<TextBlock
							className="text-3xl"
						>
							Логін:
						</TextBlock>

						<InputBlock
							type="text"
							name="username"
							value={formData.username}
							onChange={handleChange}
							className="text-4xl"

						/>
					</CardBlock>



					<CardBlock
						className="space-y-2  items-center justify-end"
					>

						<CardBlock
							className="flex items-center justify-center space-x-2 "
						>


							<ButtonBlock
								className="p-2 sky-b"
								onClick={toggleShowPassword}>
								{showPassword ?
									<IoMdEye />
									:
									<IoMdEyeOff />
								}
							</ButtonBlock>

							<TextBlock
								className="text-3xl"
							>
								Пароль:
							</TextBlock>

						</CardBlock>


						<InputBlock
							type={showPassword ? 'text' : 'password'}
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="text-4xl"
						/>



					</CardBlock>










					<ButtonBlock
						onClick={handleLogin}
						className="green-b w-full flex items-center justify-center text-4xl"
						disabled={!formData.username}
						disabledClassName="w-full text-4xl"
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
