import React from 'react';

const HeaderBlock = ({ children, className }) => {

	const style = `

	HeaderBlock bg-slate-800
	
	${className}

`


	return (

		<div className={style} >
			{children}
		</div>
	);
};

export default HeaderBlock;