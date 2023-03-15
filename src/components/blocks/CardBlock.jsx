import React from 'react';

const CardBlock = ({ children, className }) => {

	const style = `
	p-1
		m-1
		rounded
		bg-white
		bg-opacity-50
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