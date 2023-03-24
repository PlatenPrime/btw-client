import React from 'react';

const HeaderBlock = ({children, className}) => {

	const style = `

	HeaderBlock
	
	${className}

`


	return (

		<div className={style} >
			<h1 className='text-3xl '>{children} </h1>
			
		</div>
	);
};

export default HeaderBlock;