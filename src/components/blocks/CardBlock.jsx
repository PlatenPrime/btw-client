import React from 'react';

const CardBlock = ({ children, className, onClick }) => {

	const style = `

	CardBlock
	
	${className}

`


	return (
		<div className={style}
		onClick={onClick}
		>
			{children}
		</div>
	);
};

export default CardBlock;