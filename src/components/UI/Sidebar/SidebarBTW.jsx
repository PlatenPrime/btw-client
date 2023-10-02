
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import ButtonBlock from '../../blocks/ButtonBlock';
import CardBlock from '../../blocks/CardBlock';
import TextBlock from '../../blocks/TextBlock';


const SidebarBTW = () => {



	const inActiveStyles = {
		color: "white",
		padding: "12px",
		width: "100%",
	}





	const isAuth = useSelector(checkIsAuth);
	const dispatch = useDispatch();


	const logoutHandler = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
		toast('Вы вышли из системы')
	}




	return (

		<CardBlock className='hidden  min-h-screen lg:min-w-fit  lg:w-40 xl:w-56
		lg:flex flex-col justify-start items-stratch text-center 

		sticky top-0 left-0

		bg-white bg-opacity-0


		space-y-2

		 '>


			<NavLink
				to={"/"}


			>

				<CardBlock className='flex items-center justify-center w-full h-16 text-5xl text-gray-100  '>

					BTW

				</CardBlock>





			</NavLink>


			<CardBlock className='space-y-1' >


				<TextBlock className="border border-slate-500 hover:bg-slate-500/50 rounded" >
					<NavLink
						to={"stocks"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",

							background: "rgb(100 116 139)",
						} : inActiveStyles}
					>
						Запасы
					</NavLink>
				</TextBlock>


				<TextBlock className="border border-rose-500 hover:bg-rose-500/50 rounded" >
					<NavLink
						to={"arts"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(244 63 94 )",
						} : inActiveStyles}
					>
						Артикулы
					</NavLink>
				</TextBlock>




				<TextBlock className="border border-cyan-500 hover:bg-cyan-500/50 rounded">
					<NavLink
						to={"zones"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(6 182 212)",
						} : inActiveStyles}
					>
						Зоны
					</NavLink>
				</TextBlock>



				<TextBlock className="border border-violet-500 hover:bg-violet-500/50 rounded " >
					<NavLink
						to={"comps"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(139 92 246)",
						} : inActiveStyles}
					>
						Конкуренты
					</NavLink>
				</TextBlock>


			</CardBlock>



			{
				isAuth ?
					<ButtonBlock
						className="cancel-c "
						onClick={logoutHandler} >Выйти</ButtonBlock>

					:

					<ButtonBlock
						className="search-c"
					>
						<Link to={"/login"}>Войти</Link>
					</ButtonBlock>


			}


		</CardBlock >
	);
};

export default SidebarBTW;