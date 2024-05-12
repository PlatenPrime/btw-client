import React, { useState } from 'react';

import SidebarBTW from './UI/Sidebar/SidebarBTW';
import SidebarMobileBTW from './UI/Sidebar/SidebarMobileBTW';

import useLayoutStore from './layoutStore'



const Layout = ({ children }) => {



	const { showMobileSidebar, setShowMobileSidebar, toggleMobileSidebar } = useLayoutStore()








	return (




		<div className=' w-full  shadow-sm relative'>

			{showMobileSidebar && <SidebarMobileBTW onClose={toggleMobileSidebar} />}

			<div className='flex h-fit w-full justify-center'>


				<div className='w-60  xl:w-fit  hidden xl:flex '>

					<SidebarBTW />

				</div>



				{children}


			</div>




		</div>



	);
};

export default Layout;




