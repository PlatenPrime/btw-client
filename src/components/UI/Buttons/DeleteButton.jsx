import React from 'react';

const DeleteButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='bg-red-600 hover:bg-red-500 text-black p-3 m-1 w-full rounded transition ease-in-out duration-200' >

			{children}

		</button>
	);
};

export default DeleteButton;