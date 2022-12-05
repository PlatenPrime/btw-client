import React from 'react';

const MainBTW = ({ children }) => {
	return (
		<div className="w-full md:w-3/4 min-h-full max-h-screen border-4  overflow-auto ">
			{children}
		</div>
	);
};

export default MainBTW;