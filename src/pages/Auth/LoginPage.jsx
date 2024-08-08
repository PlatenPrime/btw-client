import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ContainerBlock, HeaderBlock, InputBlock, PageBTW, Spinner, TextBlock } from '../../components'
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
			className="space-y-4 px-1"
		>
			<HeaderBlock
				className="bg-gradient-to-b  from-green-700/50  to-green-400 shadow-md shadow-green-500 "
			>
				Авторизація
			</HeaderBlock>



			<ContainerBlock
				className="flex flex-col"
			>



				<TextBlock className="text-6xl" >

					BTW App
				</TextBlock>
				<TextBlock className="text-lg" >

					Balloon Trade Warehouse App
				</TextBlock>

			</ContainerBlock>



			<ContainerBlock
				className=" w-full h-full  flex flex-col items-center justify-center"
			>





				<CardBlock
					className={`space-y-4 p-6   shadow-2xl shadow-slate-500  rounded-3xl   ${!formData.username || !formData.password ? '' : 'border-4 shadow-green-500 border-green-500 '}`}
				>

					<CardBlock
						className="flex flex-col lg:flex-row gap-2 items-center justify-between"
					>

						<TextBlock
							className="text-xl text-left"
						>
							Логін:
						</TextBlock>

						<InputBlock
							type="text"
							name="username"
							value={formData.username}
							onChange={handleChange}
							className="text-xl"

						/>
					</CardBlock>



					<CardBlock
						className="flex flex-col lg:flex-row gap-2 items-center justify-center"
					>

						<CardBlock
							className="flex items-center justify-center space-x-2 "
						>




							<TextBlock
								className="text-xl"
							>
								Пароль:
							</TextBlock>



							<ButtonBlock
								className="p-2 green-b"
								onClick={toggleShowPassword}>
								{showPassword ?
									<IoMdEye />
									:
									<IoMdEyeOff />
								}
							</ButtonBlock>

						</CardBlock>


						<InputBlock
							type={showPassword ? 'text' : 'password'}
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="text-xl"
						/>



					</CardBlock>










					<ButtonBlock
						onClick={handleLogin}
						className="green-b-n w-full flex items-center justify-center text-xl"
						disabled={!formData.username || !formData.password}
						disabledClassName="w-full text-xl "
					>
						{isLogining
							?
							<Spinner color="lightgreen" />

							:
							"Вхід"
						}

					</ButtonBlock>




					<TextBlock>
						{error}
					</TextBlock>





				</CardBlock>


			</ContainerBlock>





		</PageBTW>
	)
}
