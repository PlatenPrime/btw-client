
import React, { useState } from 'react';

import { Link, NavLink, useNavigate } from "react-router-dom";
import { ButtonBlock, TextBlock, CardBlock, Spinner } from "../../index";
import { FcBinoculars, FcDeployment, FcLibrary, FcOrganization, FcSettings, FcLeave, FcLowPriority, FcRotateToLandscape, FcDocument, FcConferenceCall, FcButtingIn, FcBullish, FcList } from 'react-icons/fc';

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
					className=" rounded-xl hover:bg-sky-500/10  group"
				>


					<NavLink
						to={"/"}
					>
						<CardBlock className='flex items-center justify-center w-full h-16 text-5xl text-sky-500 font-bold group-hover:text-sky-100
				
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

			<ContainerBlock className=' p-4' >


				<TextBlock className=" bg-transparent hover:bg-orange-500/50 rounded-2xl justify-start w-full" >
					<NavLink
						to={"rows"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(249 115 22)",
							borderRadius: "1rem"
						} : inActiveStyles}
					>

						<CardBlock
							className="flex  space-x-1 "
						>
							<TextBlock
								className="text-3xl"
							>
								<FcDeployment />
							</TextBlock>

							<TextBlock>Ряди</TextBlock>
						</CardBlock>

					</NavLink>
				</TextBlock>




				<TextBlock className="bg-transparent hover:bg-emerald-500/90 rounded-2xl " >
					<NavLink
						to={"stocks"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(16 185 129)",
							borderRadius: "1rem"
						} : inActiveStyles}
					>

						<CardBlock
							className="flex  space-x-1"
						>
							<TextBlock
								className="text-3xl"
							>
								<FcLowPriority />
							</TextBlock>

							<TextBlock>Запаси</TextBlock>
						</CardBlock>

					</NavLink>
				</TextBlock>






				<TextBlock className="bg-transparent hover:bg-sky-500/90 rounded-2xl" >
					<NavLink
						to={"arts"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(14 165 233 )",
							borderRadius: "1rem"
						} : inActiveStyles}
					>
						<CardBlock
							className="flex  space-x-1"
						>
							<TextBlock
								className="text-3xl"
							>
								<FcList />
							</TextBlock>

							<TextBlock>Артикули</TextBlock>
						</CardBlock>

					</NavLink>
				</TextBlock>







				<TextBlock className="bg-transparent hover:bg-indigo-500/90 rounded-2xl" >
					<NavLink
						to={"asks"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(99 102 241)",
							borderRadius: "1rem"
						} : inActiveStyles}
					>
						<CardBlock
							className="flex  space-x-1"
						>
							<TextBlock
								className="text-3xl"
							>
								<FcRotateToLandscape />
							</TextBlock>

							<TextBlock>Запити</TextBlock>
						</CardBlock>



					</NavLink>
				</TextBlock>





				{user?.role === "PRIME" || user?.role === "ADMIN" || user?.role === "SKLAD" ?
					<TextBlock className="bg-transparent hover:bg-pink-500/90 rounded-2xl " >
						<NavLink
							to={"defs"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(236 72 153 )",
								borderRadius: "1rem"
							} : inActiveStyles}
						>
							<CardBlock
								className="flex  space-x-1"
							>
								<TextBlock
									className="text-3xl"
								>
									<FcLeave />
								</TextBlock>
								<TextBlock>Дефіцити</TextBlock>
							</CardBlock>

						</NavLink>
					</TextBlock>
					:
					null}







				{user?.role === "PRIME" || user?.role === "ADMIN" ?
					<TextBlock className="bg-transparent hover:bg-rose-500/90 rounded-2xl " >
						<NavLink
							to={"comps"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(244 63 94 )",
								borderRadius: "1rem"
							} : inActiveStyles}
						>
							<CardBlock
								className="flex  space-x-1"
							>
								<TextBlock
									className="text-3xl"
								>
									<FcBinoculars />
								</TextBlock>
								<TextBlock>Конкуренти</TextBlock>
							</CardBlock>

						</NavLink>
					</TextBlock>
					:
					null}




				{user?.role === "PRIME" ?
					<TextBlock className="bg-transparent hover:bg-blue-500/90 rounded-2xl " >
						<NavLink
							to={"ins"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(59 130 246 )",
								borderRadius: "1rem"
							} : inActiveStyles}
						>
							<CardBlock
								className="flex  space-x-1"
							>
								<TextBlock
									className="text-3xl"
								>
									<FcDocument />
								</TextBlock>

								<TextBlock>Інструкції</TextBlock>
							</CardBlock>

						</NavLink>
					</TextBlock>
					:
					null}






				{user?.role === "PRIME" ?
					<TextBlock className="bg-transparent hover:bg-green-500/90 rounded-2xl " >
						<NavLink
							to={"adapts"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(34 197 94)",
								borderRadius: "1rem"
							} : inActiveStyles}
						>
							<CardBlock
								className="flex  space-x-1"
							>
								<TextBlock
									className="text-3xl"
								>
									<FcBullish />
								</TextBlock>

								<TextBlock>Адаптації</TextBlock>
							</CardBlock>

						</NavLink>
					</TextBlock>
					:
					null}








				{user?.role === "PRIME" ?
					<TextBlock className="bg-transparent hover:bg-slate-500/90 rounded-2xl " >
						<NavLink
							to={"settings"}
							style={({ isActive }) => isActive ? {
								color: "white",
								padding: "12px",
								width: "100%",
								background: "rgb(100 116 139 )",
								borderRadius: "1rem"
							} : inActiveStyles}
						>
							<CardBlock
								className="flex  space-x-1"
							>
								<TextBlock
									className="text-3xl"
								>
									<FcSettings />
								</TextBlock>
								<TextBlock>Налаштування</TextBlock>
							</CardBlock>

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
							className="red-b px-8  w-full"
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