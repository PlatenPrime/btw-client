import React from 'react';

const DeleteButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className='buttonBTW buttonDelete' >

			{children}

		</button>
	);
};

export default DeleteButton;