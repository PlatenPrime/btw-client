
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { ButtonBlock, InputBlock, TextBlock, CardBlock } from "../../index";
import { FcBinoculars } from 'react-icons/fc';

const SidebarBTW = () => {



	const inActiveStyles = {
		color: "white",
		padding: "12px",
		width: "100%",
	}





	const isAuth = useSelector(checkIsAuth);
	const dispatch = useDispatch();


	const logoutHandler = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
		toast('Вы вышли из системы')
	}




	return (

		<CardBlock className='hidden  min-h-screen lg:min-w-fit  lg:w-40 xl:w-56
		lg:flex flex-col justify-start items-stratch text-center 
shadow-inner shadow-white
		sticky top-0 left-0

		bg-white bg-opacity-0

p-4
		space-y-10

		 '>


			<NavLink
				to={"/"}
			>
				<CardBlock className='flex items-center justify-center w-full h-16 text-5xl text-gray-100  '>

					BTW

				</CardBlock>
			</NavLink>


			<CardBlock className='space-y-4' >


				<TextBlock className="border border-orange-500 hover:bg-orange-500/90 rounded" >
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
							className="flex"
						>
							Запаси
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
						Артикули
					</NavLink>
				</TextBlock>

				<TextBlock className="border border-yellow-500 hover:bg-yellow-500/90 rounded" >
					<NavLink
						to={"asks"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(234 179 8 )",
						} : inActiveStyles}
					>
						Запити
					</NavLink>
				</TextBlock>








				<TextBlock className="border border-cyan-500 hover:bg-cyan-500/90 rounded">
					<NavLink
						to={"zones"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(6 182 212)",
						} : inActiveStyles}
					>
						Зони
					</NavLink>
				</TextBlock>



				<TextBlock className="border border-violet-500 hover:bg-violet-500/90 rounded " >
					<NavLink
						to={"comps"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(139 92 246)",
						} : inActiveStyles}
					>
						<TextBlock
							className="flex text-2xl"
						>
							<FcBinoculars /> Конкуренти
						</TextBlock>

					</NavLink>
				</TextBlock>


			</CardBlock>



			{
				isAuth ?
					<ButtonBlock
						className="cancel-c "
						onClick={logoutHandler} >Вийти</ButtonBlock>

					:

					<ButtonBlock
						className="search-c"
					>
						<Link to={"/login"}>Вхід</Link>
					</ButtonBlock>


			}


		</CardBlock >
	);
};

export default SidebarBTW;