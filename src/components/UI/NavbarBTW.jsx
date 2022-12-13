import { Navbar } from 'flowbite-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';



import { Vortex } from 'react-loader-spinner';

const NavbarBTW = () => {

	const isAuth = useSelector(checkIsAuth);
	const dispatch = useDispatch();


	const activeStyles = {
		color: "black",

	}



	return (
		<div >


			<NavLink to={"/"}  >




			</NavLink>





		</div >



	);
};

export default NavbarBTW;