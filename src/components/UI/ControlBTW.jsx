
import React from 'react';
import HeaderControlBTW from './Header/HeaderControlBTW';


const ControlBTW = ({ children }) => {
	return (
		<div className="w-full md:w-1/4 min-h-fit max-h-screen sm:min-h-full  ">

			<HeaderControlBTW>
				Панель управления
			</HeaderControlBTW>

			<div
				className='p-1'
			>
				{children}
			</div>

		</div>
	);
};

export default ControlBTW;