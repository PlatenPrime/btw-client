import React from 'react';

const ContentMain = ({ children }) => {
	return (
		<div className='w-full md:w-3/4  max-h-screen   overflow-auto' >
			{children}
		</div>
	);
};

export default ContentMain;
