import React from 'react';

const PageBTW = ({ children }) => {
	return (
		<div className=' flex flex-col sm:flex-row md:w-full border-4 border-blue-900 '>
			{children}
		</div>
	);
};

export default PageBTW;