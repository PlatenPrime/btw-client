import { Spinner } from 'flowbite-react';
import React from 'react';



import { useState } from 'react';
import NavbarBTW from './UI/NavbarBTW';
import SidebarBTW from './UI/SidebarBTW';


const Layout = ({ children }) => {




	return (
		<>
			<div className=''>

				<NavbarBTW />

				<div className='flex justify-center'>


					{children}
				</div>






			</div>

		</>
	);
};

export default Layout;




/// Нам надо чтобы был вертикальный общий лейаут, но внутри респонсив лейаут