import React from 'react';

const MainBTW = ({ children }) => {
	return (
		<div className=" flex flex-col md:flex-row h-full w-full max-h-screen   overflow-auto ">
			{children}
		</div>
	);
};

export default MainBTW;