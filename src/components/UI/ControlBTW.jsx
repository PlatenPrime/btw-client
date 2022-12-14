
import React from 'react';
import HeaderControlBTW from './Header/HeaderControlBTW';


const ControlBTW = ({ children }) => {
	return (
		<div className="w-full min-h-fit max-h-screen 
		md:w-1/4  md:min-h-full 
		
		bg-sky-100 ">

			<div className='w-full md:flex flex-col items-center justify-start mt-16'>
				{children}
			</div>



		</div>
	);
};

export default ControlBTW;