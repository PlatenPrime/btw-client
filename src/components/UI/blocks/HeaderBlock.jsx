import React, { useState } from 'react';
import NavbarBTW from '../Navbar/NavbarBTW';
import useLayoutStore from '../../layoutStore';


const HeaderBlock = ({ children, className }) => {

	const style = `

	HeaderBlock  justify-between xl:justify-center items-center  sticky top-0 opacity-95 text-center z-50 
	
	${className}

`

	const { toggleMobileSidebar } = useLayoutStore()





	return (




		<div className={style} >

			<NavbarBTW onClickSide={() => toggleMobileSidebar()} />

			{children}


			
			<div
				className="xl:hidden"
			>
				
			</div>
		</div>
	);
};

export default HeaderBlock;