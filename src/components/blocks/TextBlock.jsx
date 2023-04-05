import React from 'react';

const TextBlock = ({ children, className }) => {

	const style = `

	TextBlock
	
	${className}

`

	return (
		<p className={style} >
			{children}
		</p>
	);
};

export default TextBlock;