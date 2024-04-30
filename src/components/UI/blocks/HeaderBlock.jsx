import React from 'react';

const HeaderBlock = ({ children, className }) => {

	const style = `

	HeaderBlock 
	
	${className}

`


	return (

		<div className={style} >
			{children}
		</div>
	);
};

export default HeaderBlock;