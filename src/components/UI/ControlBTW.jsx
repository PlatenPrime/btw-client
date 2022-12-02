
import React from 'react';

const ControlBTW = ({ children }) => {
	return (
		<div className="w-full sm:w-1/4 min-h-fit max-h-screen sm:min-h-full bg-teal-300 p-5 border-4 border-yellow-400  ">
			{children}
		</div>
	);
};

export default ControlBTW;