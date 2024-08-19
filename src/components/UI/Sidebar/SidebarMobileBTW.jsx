
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ButtonBlock, TextBlock, CardBlock, Spinner } from "../../index";
import useAuthStore from '../../../pages/Auth/authStore';
import { TfiViewList } from 'react-icons/tfi';
import { SiAsciidoctor, SiGoogledocs, SiGooglelens } from 'react-icons/si';
import { GoNote } from 'react-icons/go';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { PiWarningBold } from 'react-icons/pi';
import { GiProgression } from 'react-icons/gi';


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

			className='fixed z-[100] xl:hidden  min-h-screen w-full 
		
		 bg-gray-600/50 '>

			<CardBlock
				onClick={(e) => e.stopPropagation()}
				className='
			flex flex-col justify-start items-center space-y-2 p-4
			h-full min-h-screen w-4/5 md:w-2/3 lg:w-1/2 
			bg-black bg-opacity-90 hover:bg-black
			z-1000
			'>

				<NavLink
					onClick={onClose}
					to={"/"}
					style={({ isActive }) => isActive ? activeStyles : undefined}
				>

					<CardBlock
						className='flex items-center justify-center w-full h-16 text-5xl text-gray-100 font-bold
					hover:text-sky-500
					'>

						BTW

					</CardBlock>


				</NavLink>



				<TextBlock className="w-full text-xl text-center  text-orange-500 rounded font-bold" >
					<TfiViewList size={48} />
					<NavLink
						onClick={onClose}
						to={"rows"}
						style={({ isActive }) => isActive ? {
							color: "rgb(249 115 22)",
							padding: "12px",
							width: "100%",
							// background: "rgb(249 115 22)",
						} : inActiveStyles}
					>
						Ряди
					</NavLink>
				</TextBlock>




				<TextBlock className="w-full text-xl text-center  text-emerald-500 rounded font-bold" >
					<GoNote size={48} />
					<NavLink
						onClick={onClose}
						to={"poses"}
						style={({ isActive }) => isActive ? {
							color: "rgb(16 185 129)",
							padding: "12px",
							width: "100%",
							// background: "rgb(16 185 129)",
						} : inActiveStyles}
					>

						Позиції
					</NavLink>
				</TextBlock>





				<TextBlock className="w-full text-xl text-center  text-sky-500  rounded font-bold" >
					<SiAsciidoctor size={48} />
					<NavLink
						onClick={onClose}
						to={"arts"}
						style={({ isActive }) => isActive ? {
							color: "rgb(14 165 233)",
							padding: "12px",
							width: "100%",
							// background: "rgb(14 165 233)",
						} : inActiveStyles}
					>
						Артикули
					</NavLink>
				</TextBlock>






				<TextBlock className="w-full text-xl text-center  text-indigo-500 rounded font-bold" >
					<HiOutlineDocumentDownload size={48} />
					<NavLink
						onClick={onClose}
						to={"asks"}
						style={({ isActive }) => isActive ? {
							color: "rgb(99 102 241)",
							padding: "12px",
							width: "100%",
							// background: "rgb(99 102 241)",
						} : inActiveStyles}
					>
						Запити
					</NavLink>
				</TextBlock>





				<TextBlock className="w-full text-xl text-center  text-pink-500 rounded font-bold " >
					<PiWarningBold size={48} />
					<NavLink
						onClick={onClose}
						to={"defs"}
						style={({ isActive }) => isActive ? {
							color: "rgb(236 72 153 )",
							padding: "12px",
							width: "100%",
							// background: "rgb(236 72 153 )",
						} : inActiveStyles}
					>
						Дефіцити
					</NavLink>
				</TextBlock>








				<TextBlock className="w-full text-xl text-center  text-fuchsia-500 rounded font-bold " >
					<SiGooglelens size={48} />
					<NavLink
						onClick={onClose}
						to={"comps"}
						style={({ isActive }) => isActive ? {
							color: "rgb(217 70 239 )",
							padding: "12px",
							width: "100%",

						} : inActiveStyles}
					>
						Конкуренти
					</NavLink>
				</TextBlock>




				<TextBlock className="w-full text-xl text-center  text-blue-500 rounded font-bold " >
					<SiGoogledocs size={48} />
					<NavLink
						onClick={onClose}
						to={"ins"}
						style={({ isActive }) => isActive ? {
							color: "rgb(59 130 246  )",
							padding: "12px",
							width: "100%",
							// background: "rgb(59 130 246  )",
						} : inActiveStyles}
					>
						Інструкції
					</NavLink>
				</TextBlock>





				<TextBlock className="w-full text-xl text-center  text-green-500/90 rounded font-bold " >
					<GiProgression size={48} />
					<NavLink
						onClick={onClose}
						to={"adapts"}
						style={({ isActive }) => isActive ? {
							color: "rgb(34 197 94  )",
							padding: "12px",
							width: "100%",
							// background: "rgb(34 197 94  )",
						} : inActiveStyles}
					>
						Адаптації
					</NavLink>
				</TextBlock>








				{
					user ?
						<ButtonBlock
							className="red-b-n px-8 text-2xl  "
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