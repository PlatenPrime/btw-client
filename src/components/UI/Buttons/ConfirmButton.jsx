import React from 'react';

const ConfirmButton = ({ children, onClick }) => {


	return (
		<button
			type="submit"
			onClick={onClick}
			className='buttonBTW confirm' >

			{children}

		</button>
	);
};

export default ConfirmButton;