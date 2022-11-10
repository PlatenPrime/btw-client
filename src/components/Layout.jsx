import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
	return (
		<>
			<div className='container mx-auto flex flex-col w-full'>

				<Navbar />


				<div className="w-full flex flex-row">

					<Sidebar className="md:hidden" />

					{children}

				</div>

			</div>

		</>
	);
};

export default Layout;