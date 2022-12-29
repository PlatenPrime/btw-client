import React from 'react';

const SaveButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='buttonBTW success' >

			{children}

		</button>
	);
};

export default SaveButton;