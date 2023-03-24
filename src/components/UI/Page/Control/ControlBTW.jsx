
import React from 'react';
import { ControlContext } from '../../../Layout';


const ControlBTW = ({ children }) => {

	const display = React.useContext(ControlContext);

	return (

		<>

			<div className=" hidden min-h-fit max-h-screen  md:flex w-1/4 p-2
	  flex-col items-center justify-start">

				{children}

			</div>










			<div className=" md:hidden w-full p-3  fixed bottom-0 left-0 min-h-fit max-h-screen 
		
		
		bg-gray-100 ">

				{display &&
					<div className=' md:flex flex-col items-center justify-start md:mt-16'>
						{children}
					</div>}


			</div>




		</>


	);
};

export default ControlBTW;