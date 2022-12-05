import React from 'react';

const PageBTW = ({ children }) => {
	return (
		<div className='w-full flex flex-col md:flex-row md:w-full  '>
			{children}
		</div>
	);
};

export default PageBTW;