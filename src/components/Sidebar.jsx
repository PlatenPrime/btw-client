import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Sidebar = () => {


	const isAuth = useSelector(checkIsAuth);
	const dispatch = useDispatch();

	const activeStyles = {
		color: "white",
	}


	const logoutHandler = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
		toast('Вы вышли из системы')
	}



	return (
		<div className='flex w-40  bg-gray-500 bg-opacity-50  h-full  p-4 '>
			{isAuth &&
				(<ul className='flex gap-8 flex-col'>

					<li><NavLink to={"/"} className='text-lg text-black hover:text-white' style={({ isActive }) => isActive ? activeStyles : undefined} >Главная</NavLink></li>
					
					<li><NavLink to={"rows"} className='text-lg text-black hover:text-white' style={({ isActive }) => isActive ? activeStyles : undefined}>Запасы</NavLink></li>


					<div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-md px-4 py-2' >
				{isAuth ?
					<button onClick={logoutHandler} >Выйти</button> :
					<Link to={"/login"}>Войти</Link>
				}
			</div>

				</ul>)
			}
		</div>
	);
};

export default Sidebar;