import React, { useState } from 'react';
import NavbarBTW from '../Navbar/NavbarBTW';
import useLayoutStore from '../../layoutStore';


const HeaderBlock = ({ children, className }) => {

	const style = `

	HeaderBlock bg-slate-800/50 
	text-base lg:text-xl justify-between xl:justify-center items-center  sticky top-0  text-center z-50 
	
	${className}
	backdrop-filter backdrop-blur-lg
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