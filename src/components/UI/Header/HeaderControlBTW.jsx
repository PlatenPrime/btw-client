import React from 'react';

const HeaderControlBTW = ({ children }) => {
	return (
		<div className='w-full h-16
		flex justify-center items-center   
		 bg-slate-400'>
			{children}
		</div>
	);
};

export default HeaderControlBTW;