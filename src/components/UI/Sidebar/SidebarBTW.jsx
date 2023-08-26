
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import ButtonBlock from '../../blocks/ButtonBlock';
import CardBlock from '../../blocks/CardBlock';


const SidebarBTW = () => {


	const activeStyles = {
		color: "white",

		padding: "12px",
	}

	const inActiveStyles = {
		color: "white",

		padding: "12px",
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

		 '>


			<NavLink
				to={"/"}


			>

				<div className='flex items-center justify-center w-full h-16 text-3xl text-gray-100 bg-sky-800 hover:bg-sky-700 '>

					BTW

				</div>


			</NavLink>


			<CardBlock className="bg-orange-500">
				<NavLink
					to={"rows"}
					style={({ isActive }) => isActive ? {
						color: "white",
						backgroundColor: "",
						padding: "12px",
					} : inActiveStyles}
				>
					Запасы
				</NavLink>
			</CardBlock>


			<CardBlock className="bg-teal-500">
				<NavLink
					to={"artfind"}
					style={({ isActive }) => isActive ? {
						color: "white",
						backgroundColor: "",
						padding: "12px",
					} : inActiveStyles}
				>
					Поиск артикула
				</NavLink>
			</CardBlock>


			<CardBlock className="bg-cyan-500">
				<NavLink
					to={"artszones"}
					style={({ isActive }) => isActive ? {
						color: "white",
						backgroundColor: "",
						padding: "12px",
					} : inActiveStyles}
				>
					Установка зон
				</NavLink>
			</CardBlock>



			<CardBlock className="bg-violet-500">
				<NavLink
					to={"competitors"}
					style={({ isActive }) => isActive ? {
						color: "white",
						backgroundColor: "",
						padding: "12px",
					} : inActiveStyles}
				>
					Конкуренты
				</NavLink>
			</CardBlock>



			{
				isAuth ?
					<ButtonBlock
						className="cancel-c"
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