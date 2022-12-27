import React from 'react';

const EditButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='buttonBTW buttonPrimary' >

			{children}

		</button>
	);
};

export default EditButton;