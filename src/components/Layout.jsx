import React from 'react';


import SidebarBTW from './UI/SidebarBTW';


const Layout = ({ children }) => {




	return (

		<div className='container mx-auto min-h-screen max-h-screen shadow-sm relative'>


			<div className='flex h-full w-full justify-center'>

				<SidebarBTW />

				{children}




			</div>


		</div>


	);
};

export default Layout;




