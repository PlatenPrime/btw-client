import React from 'react';

const ButtonBlock = ({ className, onClick, disabled, children }) => {


	const style = `
	
	ButtonBlock
	${className}

`


	return (
		<button
			className={style}
			onClick={onClick}
		
			disabled={disabled}
		>

			{children}

		</button>
	);
};

export default ButtonBlock;