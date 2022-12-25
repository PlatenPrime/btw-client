import React, { useState } from 'react';

import NavbarBTW from './UI/NavbarBTW';


import SidebarBTW from './UI/SidebarBTW';
import SidebarMobileBTW from './UI/SidebarMobileBTW';

export const ControlContext = React.createContext();



const Layout = ({ children }) => {

	

	const [mobileSide, setMobileSide] = useState(false)
	const [mobileControl, setMobileControl] = useState(true)

	const handlerMobileSide = () => {
		setMobileSide(prev => !prev)
		setMobileControl(false)
	}

	const handlerMobileControl = () => {
		setMobileControl(prev => !prev)

	}






	return (


		<ControlContext.Provider value={mobileControl}>

			<div className='container mx-auto min-h-screen max-h-screen shadow-sm relative'>

				{mobileSide && <SidebarMobileBTW onClose={handlerMobileSide} />}

				<NavbarBTW onClickSide={handlerMobileSide} onClickControl={handlerMobileControl} />






				<div className='flex h-full w-full justify-center'>

					<SidebarBTW />

					{ children }


				</div>


			</div>

		</ControlContext.Provider>

	);
};

export default Layout;




