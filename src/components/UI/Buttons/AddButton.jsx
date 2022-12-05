import React from 'react';

const AddButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='bg-gray-300 hover:bg-gray-100 text-green-600 p-3 my-1 w-full rounded transition ease-in-out duration-200' >

			{children}

		</button>
	);
};

export default AddButton;