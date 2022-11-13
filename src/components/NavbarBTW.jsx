import { Navbar } from 'flowbite-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

import BTWsvg from "../assets/images/BTW.svg";


import BurgerIcon from "./Icons/BurgerIcon";
import DrawIcon from "./Icons/DrawIcon";

const NavbarBTW = () => {


	const activeStyles = {
		color: "black",
		
	}



	return (
		<div >


			<Navbar
				fluid={true}
				rounded={true}
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
					<Navbar.Link
					>
						<NavLink
							to={"/"}
							className="text-gray-500"
							style={({ isActive }) => isActive ? activeStyles : undefined}

						>Главная</NavLink>

					</Navbar.Link>




					<Navbar.Link>

						<NavLink
							to={"rows"}
							style={({ isActive }) => isActive ? activeStyles : undefined}

						>

							Запасы


						</NavLink>

					</Navbar.Link>




				</Navbar.Collapse>
			</Navbar>




		</div >



	);
};

export default NavbarBTW;