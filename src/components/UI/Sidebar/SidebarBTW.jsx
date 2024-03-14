
import React, { useState } from 'react';

import { Link, NavLink, useNavigate } from "react-router-dom";
import { ButtonBlock, TextBlock, CardBlock, Spinner } from "../../index";
import { FcBinoculars, FcDeployment, FcLibrary, FcOrganization, FcSettings, FcLeave, FcLowPriority, FcRotateToLandscape, FcDocument } from 'react-icons/fc';

import useAuthStore from '../../../pages/Auth/authStore';
import ContainerBlock from '../blocks/ContainerBlock';




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


	if (!user) return null





	return (

		<CardBlock className='hidden  min-h-screen h-full lg:min-w-fit   xl:w-56
		xl:flex flex-col justify-start items-stratch text-center 
		sticky top-0 left-0
p-4
		space-y-4

		 '>


			<ContainerBlock>



				<CardBlock
					className=" rounded-xl hover:bg-sky-500/20"
				>


					<NavLink
						to={"/"}
					>
						<CardBlock className='flex items-center justify-center w-full h-16 text-5xl text-sky-500  
				hover:text-white
				'>

							BTW

						</CardBlock>


						{user
							?
							<TextBlock
								className=" p-3 "
							>{user.fullname}</TextBlock>
							:
							null}

					</NavLink>
				</CardBlock>


			</ContainerBlock>

			<ContainerBlock className='space-y-2 p-4' >


				<TextBlock className=" bg-orange-500/20 hover:bg-orange-500/90 rounded justify-start w-full" >
					<NavLink
						to={"rows"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(249 115 22)",
						} : inActiveStyles}
					>

						<TextBlock
							className="flex text-xl space-x-1"
						>
							<FcDeployment />
							<TextBlock>Ряди</TextBlock>
						</TextBlock>

					</NavLink>
				</TextBlock>




				<TextBlock className="bg-emerald-500/20 hover:bg-emerald-500/90 rounded justify-start w-full" >
					<NavLink
						to={"stocks"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(16 185 129)",
						} : inActiveStyles}
					>

						<TextBlock
							className="flex text-xl space-x-1"
						>
							<FcLowPriority />
							<TextBlock>Запаси</TextBlock>
						</TextBlock>

					</NavLink>
				</TextBlock>






				<TextBlock className="bg-sky-500/20 hover:bg-sky-500/90 rounded" >
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
							className="flex text-xl space-x-1"
						>
							<FcOrganization />
							<TextBlock>Артикули</TextBlock>
						</TextBlock>

					</NavLink>
				</TextBlock>







				<TextBlock className="bg-indigo-500/20 hover:bg-indigo-500/90 rounded" >
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
							className="flex text-xl space-x-1"
						>
							<FcRotateToLandscape />
							<TextBlock>Запити</TextBlock>
						</TextBlock>



					</NavLink>
				</TextBlock>





				{user?.role === "PRIME" || user?.role === "ADMIN" || user?.role === "SKLAD" ?
					<TextBlock className="bg-pink-500/20 hover:bg-pink-500/90 rounded " >
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
								className="flex text-xl space-x-1"
							>
								<FcLeave /> <TextBlock>Дефіцити</TextBlock>
							</TextBlock>

						</NavLink>
					</TextBlock>
					:
					null}







				{user?.role === "PRIME" || user?.role === "ADMIN" ?
					<TextBlock className="bg-rose-500/20 hover:bg-rose-500/90 rounded " >
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
								className="flex text-xl space-x-1"
							>
								<FcBinoculars /> <TextBlock>Конкуренти</TextBlock>
							</TextBlock>

						</NavLink>
					</TextBlock>
					:
					null}




				{user?.role === "PRIME" ?
					<TextBlock className="bg-blue-500/20 hover:bg-blue-500/90 rounded " >
						<NavLink
							to={"ins"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(59 130 246 )",
							} : inActiveStyles}
						>
							<TextBlock
								className="flex text-xl space-x-1"
							>
								<FcDocument />
								<TextBlock>Інструкції</TextBlock>
							</TextBlock>

						</NavLink>
					</TextBlock>
					:
					null}







				{user?.role === "PRIME" ?
					<TextBlock className="bg-slate-500/20 hover:bg-slate-500/90 rounded " >
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
								className="flex text-xl space-x-1"
							>
								<FcSettings />
								<TextBlock>Налаштування</TextBlock>
							</TextBlock>

						</NavLink>
					</TextBlock>
					:
					null}









			</ContainerBlock>





			<ContainerBlock
				className="flex justify-center p-4"
			>

				{
					user ?
						<ButtonBlock
							className="cancel-c px-8 text-xl w-full"
							onClick={handleLogout} >
							{isLogouting ?
								< Spinner color="red" />
								:
								"Вийти"

							}

						</ButtonBlock>

						:

						<ButtonBlock
							className="green-b px-8 text-xl "
						>
							<Link to={"/login"}>Вхід</Link>
						</ButtonBlock>


				}
			</ContainerBlock>








		</CardBlock >
	);
};

export default SidebarBTW;