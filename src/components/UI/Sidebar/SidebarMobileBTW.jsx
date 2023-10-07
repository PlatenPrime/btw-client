
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import { ButtonBlock, InputBlock, TextBlock, CardBlock } from "../../index";


const SidebarMobileBTW = ({ onClose }) => {


	const activeStyles = {
		color: "white",

	}

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
		<CardBlock
			onClick={onClose}

			className='fixed lg:hidden  min-h-screen w-full 
		
		 bg-gray-600 bg-opacity-50 '>

			<CardBlock
				onClick={(e) => e.stopPropagation()}
				className='
			flex flex-col justify-start items-center space-y-2 p-4
			h-full min-h-screen w-1/2
			bg-black bg-opacity-90 hover:bg-black
			
			'>

				<NavLink
					onClick={onClose}
					to={"/"}
					style={({ isActive }) => isActive ? activeStyles : undefined}
				>

					<CardBlock className='flex items-center h-16 w-full'>

						BTW

					</CardBlock>


				</NavLink>



				<TextBlock className="w-full text-center border border-slate-500 hover:bg-slate-500/50  rounded" >
					<NavLink
						onClick={onClose}
						to={"stocks"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",

							background: "rgb(244 63 94 )",
						} : inActiveStyles}
					>
						Запасы
					</NavLink>
				</TextBlock>



				<TextBlock className="w-full text-center border border-rose-500 hover:bg-rose-500/50 rounded" >
					<NavLink
						onClick={onClose}
						to={"arts"}
						style={({ isActive }) => isActive ? {
							color: "white",
							padding: "12px",
							width: "100%",
							background: "rgb(20 184 166)",
						} : inActiveStyles}
					>
						Артикулы
					</NavLink>
				</TextBlock>


				<TextBlock className="w-full text-center border border-cyan-500 hover:bg-cyan-500/50 rounded">
					<NavLink
						onClick={onClose}
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

				<TextBlock className="w-full text-center border border-violet-500 hover:bg-violet-500/50 rounded " >
					<NavLink
						onClick={onClose}
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



				{isAuth ?
					<ButtonBlock
						className="cancel-c w-full text-center"
						onClick={logoutHandler} >Выйти
					</ButtonBlock> :
					<Link to={"/login"}>Войти</Link>
				}

			</CardBlock>



		</CardBlock>
	);
};

export default SidebarMobileBTW;