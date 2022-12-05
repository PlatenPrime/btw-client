import React from 'react';

const SaveButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='bg-teal-500 hover:bg-teal-400 text-white p-3 m-1 w-full rounded transition ease-in-out duration-200' >

			{children}

		</button>
	);
};

export default SaveButton;