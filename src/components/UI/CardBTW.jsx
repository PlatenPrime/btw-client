import React from 'react';

const CardBTW = ({ children }) => {




	return (
		<div className={`bg-white m-4 p-4 rounded-lg
		flex flex-col justify-center items-center
		 hover:shadow-md 
		transition ease-in-out duration-200
		`}
		>
			{children}
		</div>
	);
};

export default CardBTW;