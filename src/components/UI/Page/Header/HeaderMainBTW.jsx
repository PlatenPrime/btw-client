import React from 'react';

const HeaderMainBTW = ({ children }) => {
	return (
		<div className='w-full h-16 p-4
		flex justify-center items-center   
		 bg-gray-600 bg-opacity-40 text-white
		 
		 sticky top-0 md:static
		 
		 '>
			{children}
		</div>
	);
};

export default HeaderMainBTW;