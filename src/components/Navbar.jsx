import React from 'react';

import BurgerIcon from "../components/Icons/BurgerIcon";
import DrawIcon from "../components/Icons/DrawIcon";

const Navbar = () => {







	return (
		<div className='flex py-4 px-1 justify-between items-center bg-gray-500 bg-opacity-50 w-full'>




			<button className='text-white md:hidden'><BurgerIcon /></button>

			<button className='text-white md:hidden'><DrawIcon /></button>









		</div>
	);
};

export default Navbar;