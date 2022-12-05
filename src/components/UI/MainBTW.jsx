import React from 'react';

const MainBTW = ({ children }) => {
	return (
		<div className="w-full md:w-3/4 min-h-full max-h-screen   overflow-auto ">
			{children}
		</div>
	);
};

export default MainBTW;