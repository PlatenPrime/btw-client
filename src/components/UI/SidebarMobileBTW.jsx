
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { Vortex } from 'react-loader-spinner';

const SidebarMobileBTW = () => {


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
		<div className='fixed md:hidden  min-h-screen w-1/2 
		flex flex-col justify-start items-center space-y-8
		 bg-sky-200 '>





		</div>
	);
};

export default SidebarMobileBTW;