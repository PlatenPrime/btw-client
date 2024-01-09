
import React, { useState } from 'react';

import { Link, NavLink, useNavigate } from "react-router-dom";
import { ButtonBlock, TextBlock, CardBlock, Spinner } from "../../index";
import { FcBinoculars, FcDeployment, FcLibrary, FcOrganization, FcSettings, FcLeave } from 'react-icons/fc';

import useAuthStore from '../../../pages/Auth/authStore';




const SidebarBTW = () => {

	const navigate = useNavigate()

	const { user, logout } = useAuthStore()


	const [isLogouting, setIsLogouting] = useState(false);


	const inActiveStyles = {
		color: "white",
		padding: "12px",
		width: "100%",
		display: "flex",
		justifyContent: "start",

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




	return (

		<CardBlock className='hidden  min-h-screen h-full lg:min-w-fit   xl:w-56
		xl:flex flex-col justify-start items-stratch text-center 
shadow-inner shadow-sky-500/50
		sticky top-0 left-0
		bg-sky-500/10
p-4
		space-y-10

		 '>


			<NavLink
				to={"/"}
			>
				<CardBlock className='flex items-center justify-center w-full h-16 text-5xl text-gray-100  
				hover:text-sky-500
				'>

					BTW

				</CardBlock>
			</NavLink>


			{user
				?
				<TextBlock
					className="bg-sky-500 p-3 rounded-xl"
				>{user.fullname}</TextBlock>
				:
				null}



			<CardBlock className='space-y-4' >


				<TextBlock className="border border-orange-500 hover:bg-orange-500/90 rounded justify-start w-full" >
					<NavLink
						to={"stocks"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(249 115 22)",
						} : inActiveStyles}
					>

						<TextBlock
							className="flex text-2xl space-x-1"
						>
							<FcLibrary />
							<TextBlock>Запаси</TextBlock>
						</TextBlock>

					</NavLink>
				</TextBlock>


				<TextBlock className="border border-sky-500 hover:bg-sky-500/90 rounded" >
					<NavLink
						to={"arts"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(14 165 233 )",
						} : inActiveStyles}
					>
						<TextBlock
							className="flex text-2xl space-x-1"
						>
							<FcOrganization />
							<TextBlock>Артикули</TextBlock>
						</TextBlock>

					</NavLink>
				</TextBlock>







				<TextBlock className="border border-indigo-500 hover:bg-indigo-500/90 rounded" >
					<NavLink
						to={"asks"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(99 102 241)",
						} : inActiveStyles}
					>
						<TextBlock
							className="flex text-2xl space-x-1"
						>
							<FcDeployment />
							<TextBlock>Запити</TextBlock>
						</TextBlock>



					</NavLink>
				</TextBlock>





				{user?.role === "PRIME" || user?.role === "ADMIN" || user?.role === "SKLAD"  ?
					<TextBlock className="border border-pink-500 hover:bg-pink-500/90 rounded " >
						<NavLink
							to={"defs"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(236 72 153 )",
							} : inActiveStyles}
						>
							<TextBlock
								className="flex text-2xl space-x-1"
							>
								<FcLeave /> <TextBlock>Дефіцити</TextBlock>
							</TextBlock>

						</NavLink>
					</TextBlock>
					:
					null}







				{user?.role === "PRIME" || user?.role === "ADMIN" ?
					<TextBlock className="border border-rose-500 hover:bg-rose-500/90 rounded " >
						<NavLink
							to={"comps"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(244 63 94 )",
							} : inActiveStyles}
						>
							<TextBlock
								className="flex text-2xl space-x-1"
							>
								<FcBinoculars /> <TextBlock>Конкуренти</TextBlock>
							</TextBlock>

						</NavLink>
					</TextBlock>
					:
					null}



				{user?.role === "PRIME" ?
					<TextBlock className="border border-slate-500 hover:bg-slate-500/90 rounded " >
						<NavLink
							to={"settings"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(100 116 139 )",
							} : inActiveStyles}
						>
							<TextBlock
								className="flex text-2xl space-x-1"
							>
								<FcSettings /><TextBlock>Налаштування</TextBlock>
							</TextBlock>

						</NavLink>
					</TextBlock>
					:
					null}









			</CardBlock>







			{
				user ?
					<ButtonBlock
						className="cancel-c px-8 text-3xl "
						onClick={handleLogout} >
						{isLogouting ?
							< Spinner color="red" />
							:
							"Вийти"

						}

					</ButtonBlock>

					:

					<ButtonBlock
						className="green-b px-8 text-3xl "
					>
						<Link to={"/login"}>Вхід</Link>
					</ButtonBlock>


			}


		</CardBlock >
	);
};

export default SidebarBTW;