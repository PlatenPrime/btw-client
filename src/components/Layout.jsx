import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
	return (
		<>
			<div className='container mx-auto flex'>

				

				<div className='w-full'>

					<Navbar />

					{children}

				</div>

			</div>

		</>
	);
};

export default Layout;