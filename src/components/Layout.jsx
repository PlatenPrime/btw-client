import { Spinner } from 'flowbite-react';
import React from 'react';



import { useState } from 'react';
import NavbarBTW from './UI/NavbarBTW';


const Layout = ({ children }) => {




	return (
		<>
			<div className=''>

				<NavbarBTW />

			
					{children}
				




			</div>

		</>
	);
};

export default Layout;




/// Нам надо чтобы был вертикальный общий лейаут, но внутри респонсив лейаут