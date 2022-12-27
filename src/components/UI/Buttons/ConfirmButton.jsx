import React from 'react';

const ConfirmButton = ({ children, onClick }) => {


	return (
		<button
			type="submit"
			onClick={onClick}
			className='buttonBTW buttonConfirm' >

			{children}

		</button>
	);
};

export default ConfirmButton;