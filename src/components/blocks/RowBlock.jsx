import React from 'react';


const RowBlock = ({ children, className}) => {

	const	style = `
	
	RowBlock
	${className}

`


	return (
		<div  
		className={style}
		
		
		>
			{children}
		</div>
	);
};

export default RowBlock;