import React from 'react';

const TextBlock = ({ children, className, onClick }) => {

	const style = `

	TextBlock
	
	${className}

`

	return (
		<p
			className={style}
			onClick={onClick}
		>
			{children}
		</p>
	);
};

export default TextBlock;