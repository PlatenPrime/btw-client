
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import ButtonBlock from '../../blocks/ButtonBlock';
import CardBlock from '../../blocks/CardBlock';
import TextBlock from '../../blocks/TextBlock';


const SidebarBTW = () => {


	const activeStyles = {
		color: "white",

		padding: "12px",
	}

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

		<div className='hidden  min-h-screen md:min-w-fit md:w-1/6 
		md:flex flex-col justify-start items-stratch text-center 

		sticky top-0

		bg-white bg-opacity-0


		space-y-2

		 '>


			<NavLink
				to={"/"}


			>

				<div className='flex items-center justify-center w-full h-16 text-5xl text-gray-100  hover:bg-sky-700/80 '>

					BTW

				</div>





			</NavLink>


			<CardBlock className='space-y-1' >


				<TextBlock className="border border-orange-500 rounded" >
					<NavLink
						to={"rows"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",

							background: "rgb(249 115 22)",
						} : inActiveStyles}
					>
						Запасы
					</NavLink>
				</TextBlock>


				<TextBlock className="border border-teal-500 rounded" >
					<NavLink
						to={"artfind"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(20 184 166)",
						} : inActiveStyles}
					>
						Артикулы
					</NavLink>
				</TextBlock>


				<TextBlock className="border border-cyan-500 rounded">
					<NavLink
						to={"artszones"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(6 182 212)",
						} : inActiveStyles}
					>
						Установка зон
					</NavLink>
				</TextBlock>



				<TextBlock className="border border-violet-500 rounded" >
					<NavLink
						to={"competitors"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(139 92 246)",
						} : inActiveStyles}
					>
						Конкуренты
					</NavLink>
				</TextBlock>


			</CardBlock>



			{
				isAuth ?
					<ButtonBlock
						className="cancel-c "
						onClick={logoutHandler} >Выйти</ButtonBlock>

					:

					<ButtonBlock
						className="search-c"
					>
						<Link to={"/login"}>Войти</Link>
					</ButtonBlock>


			}


		</div >
	);
};

export default SidebarBTW;