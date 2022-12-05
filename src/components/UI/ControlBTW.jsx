
import React from 'react';

const ControlBTW = ({ children }) => {
	return (
		<div className="w-full sm:w-1/4 min-h-fit max-h-screen sm:min-h-full  p-5  ">
			Панель управления
			{children}
		</div>
	);
};

export default ControlBTW;