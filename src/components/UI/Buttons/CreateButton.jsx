import React from 'react';

const CreateButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='buttonBTW create' >

			{children}

		</button>
	);
};

export default CreateButton;