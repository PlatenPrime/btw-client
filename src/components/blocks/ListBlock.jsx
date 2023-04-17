import React from 'react';

const ListBlock = ({ children, className }) => {


	const style = `

	ListBlock
	
	${className}

`



	return (
		<div className={style}  >
			{children}
		</div>
	);
};

export default ListBlock;