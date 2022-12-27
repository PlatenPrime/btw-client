import React from 'react';

const CancelButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='buttonBTW buttonCancel' >

			{children}

		</button>
	);
};

export default CancelButton;