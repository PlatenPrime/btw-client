import React from 'react';

const HeaderBlock = ({ children, className }) => {

	const style = `

	HeaderBlock
	
	${className}

`


	return (

		<div className={style} >
			<div className='text-3xl w-full'>{children} </div>
		</div>
	);
};

export default HeaderBlock;