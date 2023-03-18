import React from 'react';

const CardBlock = ({ children, className }) => {

	const style = `

	CardBlock
	
	${className}

`


	return (
		<div className={style}>
			{children}
		</div>
	);
};

export default CardBlock;