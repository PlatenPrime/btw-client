import { Spinner } from 'flowbite-react';
import React from 'react';



import { useState } from 'react';
import NavbarBTW from './NavbarBTW';


const Layout = ({ children }) => {




	return (
		<>
			<div >

				<NavbarBTW />



				{children}


			</div>

		</>
	);
};

export default Layout;