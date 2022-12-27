
import React from 'react';
import { ControlContext } from '../../Layout';


const ControlBTW = ({ children }) => {



	return (
		<div className=" hidden min-h-fit max-h-screen  min-h-full md:flex w-1/4 p-2
		w-full  flex-col items-center justify-start
		
	">



			{children}



		</div>
	);
};

export default ControlBTW;