import React from 'react';


import NavbarBTW from './UI/NavbarBTW';

import SidebarBTW from './UI/SidebarBTW';


const Layout = ({ children }) => {




	return (

		<div className='container mx-auto max-h-screen'>

			<NavbarBTW />

			<div className='flex w-full justify-center'>
			

				{children}




			</div>


		</div>


	);
};

export default Layout;




