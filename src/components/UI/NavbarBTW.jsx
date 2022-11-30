import { Navbar } from 'flowbite-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';


import BTWsvg from "../../assets/images/BTW.svg";


import BurgerIcon from "../Icons/BurgerIcon";
import DrawIcon from "../Icons/DrawIcon";

const NavbarBTW = () => {

	const isAuth = useSelector(checkIsAuth);
	const dispatch = useDispatch();


	const activeStyles = {
		color: "black",

	}


	const logoutHandler = () => {
		dispatch(logout())
		window.localStorage.removeItem('token')
		toast('Вы вышли из системы')
	}


	return (
		<div >


			<Navbar
				fluid={true}
				rounded={true}
				className="bg-sky-300"
			>

				<NavLink to={"/"}  >

					<Navbar.Brand >
						<img
							src={BTWsvg}
							className="mr-3 h-6 sm:h-9"
							alt="BTW Logo"
						/>
						<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
							BTW
						</span>

					</Navbar.Brand>
				</NavLink>


				<Navbar.Toggle />
				<Navbar.Collapse>


					<Navbar.Link>
						<NavLink
							to={"rows"}
							style={({ isActive }) => isActive ? activeStyles : undefined}
						>
							Запасы
						</NavLink>
					</Navbar.Link>


					<Navbar.Link>
						<NavLink
							to={"artszones"}
							style={({ isActive }) => isActive ? activeStyles : undefined}
						>
							Установка зон
						</NavLink>
					</Navbar.Link>


					<Navbar.Link>
						<NavLink
							to={"artfind"}
							style={({ isActive }) => isActive ? activeStyles : undefined}
						>
							Поиск артикула
						</NavLink>
					</Navbar.Link>



					<Navbar.Link>

						{isAuth ?
							<button
								className="text-red-600"
								onClick={logoutHandler} >Выйти</button> :
							<Link to={"/login"}>Войти</Link>
						}

					</Navbar.Link>






				</Navbar.Collapse>
			</Navbar>




		</div >



	);
};

export default NavbarBTW;