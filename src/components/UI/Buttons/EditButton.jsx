import React from 'react';

const EditButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='buttonBTW edit' >

			{children}

		</button>
	);
};

export default EditButton;