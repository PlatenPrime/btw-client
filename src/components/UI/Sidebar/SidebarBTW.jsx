
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';


const SidebarBTW = () => {


	const activeStyles = {
		color: "white",

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
		md:flex flex-col justify-start items-center space-y-8

		sticky top-0

		 '>


			<NavLink
				to={"/"}
				style={({ isActive }) => isActive ? activeStyles : undefined}
			>

				<div className='flex items-center h-16 text-gray-700 '>

					BTW

				</div>


			</NavLink>



			<NavLink
				to={"rows"}
				style={({ isActive }) => isActive ? activeStyles : undefined}
			>
				Запасы
			</NavLink>

			<NavLink
				to={"artfind"}
				style={({ isActive }) => isActive ? activeStyles : undefined}
			>
				Поиск артикула
			</NavLink>


			<NavLink
				to={"artszones"}
				style={({ isActive }) => isActive ? activeStyles : undefined}
			>
				Установка зон
			</NavLink>



			{isAuth ?
				<button
					className="text-red-600"
					onClick={logoutHandler} >Выйти</button> :
				<Link to={"/login"}>Войти</Link>
			}


		</div>
	);
};

export default SidebarBTW;