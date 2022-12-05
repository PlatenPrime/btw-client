import React from 'react';

const EditButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='bg-sky-700 hover:bg-sky-500 text-white p-3 my-1 w-full rounded transition ease-in-out duration-200' >

			{children}

		</button>
	);
};

export default EditButton;