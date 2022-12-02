import React from 'react';
import { useState } from 'react';

import NavbarBTW from './UI/NavbarBTW';
import PageBTW from './UI/PageBTW';
import SidebarBTW from './UI/SidebarBTW';


const Layout = ({ children }) => {




	return (

		<div className='container mx-auto '>

			<NavbarBTW />

			<div className='flex w-full justify-center'>
				<SidebarBTW />

				{children}




			</div>


		</div>


	);
};

export default Layout;




/// Нам надо чтобы был вертикальный общий лейаут, но внутри респонсив лейаут