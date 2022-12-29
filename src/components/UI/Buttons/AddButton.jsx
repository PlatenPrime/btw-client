import React from 'react';

const AddButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='buttonBTW add' >

			{children}

		</button>
	);
};

export default AddButton;