import React from 'react';

const CardBTW = ({ children }) => {




	return (
		<div className={`bg-white m-4 p-4 rounded-lg
		shadow-md hover:shadow-md hover:shadow-sky-300
		transition ease-in-out duration-200
		`}
		>
			{children}
		</div>
	);
};

export default CardBTW;