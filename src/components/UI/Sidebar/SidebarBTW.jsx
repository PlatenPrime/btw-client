
import React, { useState } from 'react';

import { Link, NavLink, useNavigate } from "react-router-dom";
import { ButtonBlock, TextBlock, CardBlock, Spinner, ContainerBlock } from "../../index";

import useAuthStore from '../../../pages/Auth/authStore';

import { TfiViewList } from "react-icons/tfi";
import { GoNote } from "react-icons/go";
import { SiAsciidoctor } from "react-icons/si";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { PiWarningBold } from "react-icons/pi";
import { SiGooglelens } from "react-icons/si";
import { GiProgression } from "react-icons/gi";
import { SiGoogledocs } from "react-icons/si";
import { MdSettingsSuggest } from "react-icons/md";
import { ImExit } from "react-icons/im";




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

		 '>


			<ContainerBlock
			className="rounded-r-xl rounded-l-none   group"
			>
					<NavLink
						to={"/"}
					>
						<CardBlock className='flex items-center justify-center w-full h-16 text-5xl text-sky-100 font-bold group-hover:text-sky-500
				'>
							BTW
						</CardBlock>
						{user
							?
							<TextBlock
								className=" p-3 text-sky-100 font-bold group-hover:text-sky-500 "
							>{user.fullname}</TextBlock>
							:
							null}

					</NavLink>
			</ContainerBlock>




			<ContainerBlock className='rounded-r-xl rounded-l-none p-4' >


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
								<TfiViewList />
							</TextBlock>

							<TextBlock>Ряди</TextBlock>
						</CardBlock>

					</NavLink>
				</TextBlock>




				<TextBlock className="bg-transparent hover:bg-emerald-500/90 rounded-2xl " >
					<NavLink
						to={"poses"}
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
								<GoNote />
							</TextBlock>

							<TextBlock>Позиції</TextBlock>
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
								<SiAsciidoctor />
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
								<HiOutlineDocumentDownload />
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
									<PiWarningBold />
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
									<SiGooglelens />

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
									<SiGoogledocs />
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
									<GiProgression />
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
									<MdSettingsSuggest />
								</TextBlock>
								<TextBlock>Налаштування</TextBlock>
							</CardBlock>

						</NavLink>
					</TextBlock>
					:
					null}

			</ContainerBlock>





			<ContainerBlock
				className="flex justify-center p-0 rounded-r-xl rounded-l-none "
			>

				{
					user ?
						<ButtonBlock
							className="red-b px-8  w-full"
							onClick={handleLogout} >
							{isLogouting ?
								< Spinner color="red" />
								:
								<><ImExit />Вийти</>


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