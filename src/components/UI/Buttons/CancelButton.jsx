import React from 'react';

const CancelButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='bg-gray-300 hover:bg-gray-100 text-red-600 p-3 m-1 w-full rounded transition ease-in-out duration-200' >

			{children}

		</button>
	);
};

export default CancelButton;