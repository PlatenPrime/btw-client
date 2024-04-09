
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ButtonBlock, TextBlock, CardBlock, Spinner } from "../../index";
import useAuthStore from '../../../pages/Auth/authStore';


const SidebarMobileBTW = ({ onClose }) => {


	const navigate = useNavigate()
	const { user, logout } = useAuthStore()
	const [isLogouting, setIsLogouting] = useState(false);






	const activeStyles = {
		color: "white",

	}

	const inActiveStyles = {
		color: "white",
		padding: "12px",
		width: "100%",

	}




	const handleLogout = async () => {
		try {
			setIsLogouting(true)

			await logout()

			navigate("/login")


		} catch (error) {
			console.error('Login error:', error);
		} finally {
			setIsLogouting(false)
		}
	};

	console.log(user);


	if (!user) return null




	return (
		<CardBlock
			onClick={onClose}

			className='fixed z-50 xl:hidden  min-h-screen w-full 
		
		 bg-gray-600/50 '>

			<CardBlock
				onClick={(e) => e.stopPropagation()}
				className='
			flex flex-col justify-start items-center space-y-2 p-4
			h-full min-h-screen w-1/2
			bg-black bg-opacity-90 hover:bg-black
			z-1000
			'>

				<NavLink
					onClick={onClose}
					to={"/"}
					style={({ isActive }) => isActive ? activeStyles : undefined}
				>

					<CardBlock
						className='flex items-center justify-center w-full h-16 text-5xl text-gray-100 
					hover:text-sky-500
					'>

						BTW

					</CardBlock>


				</NavLink>



				<TextBlock className="w-full text-xl text-center border border-orange-500 hover:bg-orange-500/90 rounded font-bold" >
					<NavLink
						onClick={onClose}
						to={"rows"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(249 115 22)",
						} : inActiveStyles}
					>
						Ряди
					</NavLink>
				</TextBlock>




				<TextBlock className="w-full text-xl text-center border border-emerald-500 hover:bg-emerald-500/90 rounded font-bold" >
					<NavLink
						onClick={onClose}
						to={"stocks"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(16 185 129)",
						} : inActiveStyles}
					>
						Запаси
					</NavLink>
				</TextBlock>





				<TextBlock className="w-full text-xl text-center border border-sky-500 hover:bg-sky-500/90  rounded font-bold" >
					<NavLink
						onClick={onClose}
						to={"arts"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(14 165 233)",
						} : inActiveStyles}
					>
						Артикули
					</NavLink>
				</TextBlock>






				<TextBlock className="w-full text-xl text-center border border-indigo-500 hover:bg-indigo-500/90 rounded font-bold" >
					<NavLink
						onClick={onClose}
						to={"asks"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(99 102 241)",
						} : inActiveStyles}
					>
						Запити
					</NavLink>
				</TextBlock>




				{user?.role === "PRIME" || user?.role === "ADMIN" || user?.role === "SKLAD" ?
					<TextBlock className="w-full text-xl text-center border border-pink-500 hover:bg-pink-500/90 rounded font-bold " >
						<NavLink
							onClick={onClose}
							to={"defs"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(236 72 153 )",
							} : inActiveStyles}
						>
							Дефіцити
						</NavLink>
					</TextBlock>
					:
					null}






				{user?.role === "PRIME" || user?.role === "ADMIN" ?
					<TextBlock className="w-full text-xl text-center border border-rose-500 hover:bg-rose-500/90 rounded font-bold " >
						<NavLink
							onClick={onClose}
							to={"comps"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(244 63 94 )",
							} : inActiveStyles}
						>
							Конкуренти
						</NavLink>
					</TextBlock>
					:
					null}


				{user?.role === "PRIME" ?
					<TextBlock className="w-full text-xl text-center border border-blue-500 hover:bg-blue-500/90 rounded font-bold " >
						<NavLink
							onClick={onClose}
							to={"ins"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(59 130 246  )",
							} : inActiveStyles}
						>
							Інструкції
						</NavLink>
					</TextBlock>
					:
					null}



				{
					user ?
						<ButtonBlock
							className="cancel-c px-8 text-4xl  "
							onClick={() => {
								onClose()
								handleLogout();

							}}
						>
							{isLogouting ?
								< Spinner color="red" />
								:
								"Вийти"

							}

						</ButtonBlock>

						:

						<ButtonBlock
							onClick={onClose}
							className="green-b px-8 text-4xl "
						>
							<Link to={"/login"}>Вхід</Link>
						</ButtonBlock>


				}



			</CardBlock>



		</CardBlock >
	);
};

export default SidebarMobileBTW;