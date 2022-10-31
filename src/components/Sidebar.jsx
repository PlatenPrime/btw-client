import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { checkIsAuth } from '../redux/features/auth/authSlice';

const Sidebar = () => {


	const isAuth = useSelector(checkIsAuth);

	const activeStyles = {
		color: "white",
	}




	return (
		<div className='flex w-full  bg-gray-500 bg-opacity-50  h-full min-h-screen p-4 '>
			{isAuth &&
				(<ul className='flex gap-8 flex-col'>
					<li><NavLink to={"/"} className='text-lg text-black hover:text-white' style={({ isActive }) => isActive ? activeStyles : undefined} >Главная</NavLink></li>
					<li><NavLink to={"pallets"} className='text-lg text-black hover:text-white' style={({ isActive }) => isActive ? activeStyles : undefined}>Паллеты</NavLink></li>

				</ul>)
			}
		</div>
	);
};

export default Sidebar;