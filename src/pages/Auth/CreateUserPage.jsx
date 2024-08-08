import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, InputBlock, PageBTW, TextBlock, Spinner, } from '../../components'
import { Link } from 'react-router-dom'
import useAuthStore from './authStore'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";





export default function CreateUserPage() {


	const { getRoles, getUsers, user, users, roles, registration } = useAuthStore()

	const [isFetchingData, setIsFetchingData] = useState(false)
	const [isCreatingUser, setIsCreatingUser] = useState(false)

	const [formData, setFormData] = useState({
		username: '',
		password: '',
		role: '',
		fullname: ""
	});


	const [showPassword, setShowPassword] = useState(false);







	useEffect(() => {

		const fetchData = async () => {

			try {

				setIsFetchingData(true)

				const users = await getUsers()
				const roles = await getRoles()

			} catch (error) {
				console.log(error);
			} finally {
				setIsFetchingData(false)
			}
		}

		fetchData()
		return () => {

		}
	}, [])


	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};




	const handleCreateUser = async () => {
		try {
			setIsCreatingUser(true)

			await registration(formData)



		} catch (error) {
			console.log(error);


		} finally {
			setIsCreatingUser(false)
		}
	}




	return (
		<PageBTW
			className="space-y-4"
		>
			<HeaderBlock
				className="bg-gradient-to-b  from-green-700/50  to-green-400 shadow-md shadow-green-500 "
			>
				Створення користувача
			</HeaderBlock>



			{user?.role === "PRIME"
				?
				<CardBlock
				className="space-y-4"
				>
					<ButtonGroup>

						<ButtonGroup.Navigation>

						<ButtonBlock
							className="slate-b-n "
						>
							<Link
								to="/settings"
							>
								Повернутись до налаштувань
							</Link>
						</ButtonBlock>

						</ButtonGroup.Navigation>

						<ButtonGroup.Actions></ButtonGroup.Actions>



					</ButtonGroup>



					<CardBlock

					>

						<CardBlock
							className=" w-full h-full  flex flex-col items-center justify-center"
						>





							<CardBlock
								className="space-y-4 p-6 border border-white shadow-md shadow-white rounded-3xl"
							>

								<CardBlock
									className=" space-x-2 flex justify-end"
								>

									<TextBlock
										className="text-xl"
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
									className="space-x-2 flex justify-end "
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
											className="text-xl"
										>
											Пароль:
										</TextBlock>

									</CardBlock>


									<InputBlock
										type={showPassword ? 'text' : 'password'}
										name="password"
										value={formData.password}
										onChange={handleChange}
										className="text-xl"
									/>

								</CardBlock>




								<CardBlock
									className="space-x-2 flex justify-end "
								>

									<TextBlock
										className="text-xl"
									>
										Повне ім'я:
									</TextBlock>

									<InputBlock
										type="text"
										name="fullname"
										value={formData.fullname}
										onChange={handleChange}
										className="text-xl"

									/>
								</CardBlock>




								<CardBlock
									className="space-x-2 flex justify-end "
								>

									<TextBlock
										className="text-xl"
									>
										Роль:
									</TextBlock>

									<InputBlock
										type="text"
										name="role"
										value={formData.role}
										onChange={handleChange}
										className="text-xl"

									/>
								</CardBlock>



								<ButtonBlock
									onClick={handleCreateUser}
									className="green-b w-full flex items-center justify-center text-xl"
									disabled={!formData.username || !formData.fullname || !formData.password}
									disabledClassName="w-full text-xl"
								>
									{isCreatingUser
										?
										<Spinner color="lightgreen" />

										:
										"Створити"
									}
								</ButtonBlock>







							</CardBlock>


						</CardBlock>







					</CardBlock>







					<CardBlock
						className="p-2 space-y-2"
					>
						{users?.map((user, i) =>
							<CardBlock
								key={user?.username}
								className="border border-white flex justify-between p-2"
							>

								<TextBlock>{user.fullname}</TextBlock>
								<TextBlock className="bg-green-500 p-1 rounded-xl" >{user.role}</TextBlock>

							</CardBlock>
						)}
					</CardBlock>








				</CardBlock>

				:
				<TextBlock>
					У вас немає прав на перегляд цієї сторінки
				</TextBlock>
			}




		</PageBTW >
	)
}
