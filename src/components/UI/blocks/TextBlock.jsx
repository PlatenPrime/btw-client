import React from 'react';

const TextBlock = ({ children, className, onClick }) => {

	const style = `

	TextBlock
	
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

export default TextBlock;