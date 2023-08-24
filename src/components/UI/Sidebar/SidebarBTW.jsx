
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import ButtonBlock from '../../blocks/ButtonBlock';


const SidebarBTW = () => {


	const activeStyles = {
		color: "white",
		backgroundColor: "darkgray",

		padding: "12px",
	}

	const inActiveStyles = {
		color: "white",
		backgroundColor: "black",
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



			<NavLink
				to={"rows"}
				style={({ isActive }) => isActive ? activeStyles : inActiveStyles}
			>
				Запасы
			</NavLink>

			<NavLink
				to={"artfind"}
				style={({ isActive }) => isActive ? activeStyles : inActiveStyles}
			>
				Поиск артикула
			</NavLink>


			<NavLink
				to={"artszones"}
				style={({ isActive }) => isActive ? activeStyles : inActiveStyles}
			>
				Установка зон
			</NavLink>



			<NavLink
				to={"competitors"}
				style={({ isActive }) => isActive ? activeStyles : inActiveStyles}
			>
				Конкуренты
			</NavLink>



			{isAuth ?
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


		</div>
	);
};

export default SidebarBTW;