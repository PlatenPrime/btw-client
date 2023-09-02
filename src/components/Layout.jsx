import React, { useState } from 'react';

import NavbarBTW from './UI/Navbar/NavbarBTW';


import SidebarBTW from './UI/Sidebar/SidebarBTW';
import SidebarMobileBTW from './UI/Sidebar/SidebarMobileBTW';



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


				<div className='w-60  lg:w-72  hidden md:flex'>

					<SidebarBTW />

				</div>



				{children}


			</div>




		</div>



	);
};

export default Layout;




