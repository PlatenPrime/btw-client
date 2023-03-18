import React from 'react';

const CardBlock = ({ children, className }) => {

	const style = `

	cardblock

	p-16
		m-1
		rounded
		
	bg-white
		shadow hover:shadow-lg
		transition ease-in-out duration-300

		${className}

`


	return (
		<div className={style}>
			{children}
		</div>
	);
};

export default CardBlock;