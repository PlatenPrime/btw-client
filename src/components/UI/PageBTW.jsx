import React from 'react';

const PageBTW = ({ children }) => {
	return (
		<div className=' flex flex-col md:flex-row md:w-full border-2 border-sky-400 '>
			{children}
		</div>
	);
};

export default PageBTW;