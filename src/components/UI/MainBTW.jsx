import React from 'react';

const MainBTW = ({ children }) => {
	return (
		<div className="w-full sm:w-3/4 min-h-full max-h-screen bg-red-300 p-5 border-4 border-green-600 overflow-auto ">
			{children}
		</div>
	);
};

export default MainBTW;