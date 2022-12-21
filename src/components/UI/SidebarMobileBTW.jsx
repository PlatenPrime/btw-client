
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { Vortex } from 'react-loader-spinner';

const SidebarMobileBTW = ({ onClose }) => {


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
		<div
			onClick={onClose}

			className='fixed md:hidden  min-h-screen w-full 
		
		 bg-gray-600 bg-opacity-50 '>

			<div
				onClick={(e) => e.stopPropagation()}
				className='
			flex flex-col justify-start items-center space-y-8
			h-full min-h-screen w-1/2
			bg-sky-200 bg-opacity-80
			
			'>

				<NavLink
					onClick={onClose}
					to={"/"}
					style={({ isActive }) => isActive ? activeStyles : undefined}
				>

					<div className='flex items-center h-16'>

						BTW

					</div>


				</NavLink>



				<NavLink
					onClick={onClose}
					to={"rows"}
					style={({ isActive }) => isActive ? activeStyles : undefined}
				>
					Запасы
				</NavLink>

				<NavLink
				onClick={onClose}
					to={"artfind"}
					style={({ isActive }) => isActive ? activeStyles : undefined}
				>
					Поиск артикула
				</NavLink>


				<NavLink
				onClick={onClose}
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



		</div>
	);
};

export default SidebarMobileBTW;