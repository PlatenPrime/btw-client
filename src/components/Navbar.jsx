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



	return (
		<div className='flex py-4 px-1 justify-between items-center bg-gray-500 bg-opacity-50 w-full'>

			<button>Левое меню</button>
			Правое меню






		</div>
	);
};

export default Navbar;