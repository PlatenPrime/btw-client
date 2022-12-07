import React from 'react';

const ConfirmButton = ({ children, onClick }) => {


	return (
		<button
			type="submit"
			onClick={onClick}
			className='bg-sky-600 hover:bg-sky-500 text-white p-3 my-1 w-full rounded transition ease-in-out duration-200' >

			{children}

		</button>
	);
};

export default ConfirmButton;