
import React from 'react';
import HeaderControlBTW from './Header/HeaderControlBTW';


const ControlBTW = ({ children }) => {
	return (
		<div className="w-full md:w-1/4 min-h-fit max-h-screen sm:min-h-full p-1 bg-sky-200 ">

			
				{children}
		

		</div>
	);
};

export default ControlBTW;