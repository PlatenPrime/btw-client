import React from 'react';

const CreateButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='buttonBTW buttonCreate' >

			{children}

		</button>
	);
};

export default CreateButton;