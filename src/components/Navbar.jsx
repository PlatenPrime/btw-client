import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {



	const isAuth = useSelector(checkIsAuth);
	const dispatch = useDispatch();


	const logoutHandler = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
		toast('Вы вышли из системы')
	}



	const activeStyles = {
		color: "white",
	}


	return (
		<div className='flex py-4 px-1 justify-between items-center bg-gray-500 bg-opacity-50 w-full'>


			<div className='flex  '>
				{isAuth &&
					(<ul className='flex gap-8 '>
						<li><NavLink to={"/"} className='text-lg text-black hover:text-white' style={({ isActive }) => isActive ? activeStyles : undefined} >Главная</NavLink></li>
						<li><NavLink to={"rows"} className='text-lg text-black hover:text-white' style={({ isActive }) => isActive ? activeStyles : undefined}>Запасы</NavLink></li>


					</ul>)
				}
			</div>





			<div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-md px-4 py-2' >
				{isAuth ?
					<button onClick={logoutHandler} >Выйти</button> :
					<Link to={"/login"}>Войти</Link>
				}
			</div>


		</div>
	);
};

export default Navbar;