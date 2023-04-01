import React from 'react';


const RowBlock = ({ children, className, onClick}) => {

	const	style = `
	
	RowBlock
	${className}

`


	return (
		<div  
		className={style}
		onClick={onClick}
		
		>
			{children}
		</div>
	);
};

export default RowBlock;