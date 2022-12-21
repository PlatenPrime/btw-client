import React, { useState } from 'react';
import NavbarBTW from './UI/NavbarBTW';


import SidebarBTW from './UI/SidebarBTW';
import SidebarMobileBTW from './UI/SidebarMobileBTW';


const Layout = ({ children }) => {

	const [mobileSide, setMobileSide] = useState(false)

	const handlerMobileSide = () => {
		setMobileSide(prev => !prev)
	}



	return (

		<div className='container mx-auto min-h-screen max-h-screen shadow-sm relative'>

			{mobileSide && <SidebarMobileBTW onClose={handlerMobileSide} />}

			<NavbarBTW onClickSide={handlerMobileSide} />

			<div className='flex h-full w-full justify-center'>

				<SidebarBTW />

				{children}




			</div>


		</div>


	);
};

export default Layout;




