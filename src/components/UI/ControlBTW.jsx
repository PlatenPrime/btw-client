
import React from 'react';
import { ControlContext } from '../Layout';


const ControlBTW = ({ children }) => {

	const display = React.useContext(ControlContext);

	return (
		<div className="w-full fixed bottom-0 left-0 min-h-fit max-h-screen 
		md:w-1/4  md:min-h-full  md:static
		
		bg-sky-100 ">

			{display &&
				<div className='w-full md:flex flex-col items-center justify-start md:mt-16'>
					{children}
				</div>}


		</div>
	);
};

export default ControlBTW;