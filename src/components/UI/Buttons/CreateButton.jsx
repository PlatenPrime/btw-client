import React from 'react';

const CreateButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='bg-green-600 hover:bg-green-500 text-white p-3 m-1 w-full rounded transition ease-in-out duration-200' >

			{children}

		</button>
	);
};

export default CreateButton;