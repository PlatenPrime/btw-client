import React from 'react';

const MainBTW = ({ children }) => {
	return (
		<div className="w-3/4 min-h-full bg-red-300 p-5 border-4 border-green-600 ">
			{children}
		</div>
	);
};

export default MainBTW;