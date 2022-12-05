
import React from 'react';
import HeaderPageBTW from './HeaderPageBTW';

const ControlBTW = ({ children }) => {
	return (
		<div className="w-full md:w-1/4 min-h-fit max-h-screen sm:min-h-full   ">

			<HeaderPageBTW>
				Панель управления

			</HeaderPageBTW>



			{children}
		</div>
	);
};

export default ControlBTW;