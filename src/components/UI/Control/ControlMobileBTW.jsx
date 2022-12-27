
import React from 'react';
import { ControlContext } from '../../Layout';


const ControlMobileBTW = ({ children }) => {

	const display = React.useContext(ControlContext);

	return (
		<div className="w-full fixed bottom-0 left-0 min-h-fit max-h-screen 
		md:hidden
		
		bg-sky-300 bg-opacity-40">

			{display &&
				<div className='w-full md:flex flex-col items-center justify-start md:mt-16'>
					{children}
				</div>}


		</div>
	);
};

export default ControlMobileBTW;