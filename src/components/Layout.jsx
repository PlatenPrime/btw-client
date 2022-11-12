import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Drawbar from './Drawbar';
import { useState } from 'react';

const Layout = ({ children }) => {

	const [openDraw, setOpenDraw] = useState(false);




	return (
		<>
			<div className='container mx-auto flex flex-col w-full'>

				<Navbar setOpenDraw={setOpenDraw} />


				<div className="w-full flex flex-row">

					<Sidebar />

					{children}

				</div>

			</div>

		</>
	);
};

export default Layout;