import React from 'react';

const ButtonBlock = ({ className, onClick, disabled, children, type }) => {




	const style = disabled ?
		`ButtonBlock disabled`
		:
		`ButtonBlock ${className}`


	return (
		<button
			className={style}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>

			{children}

		</button>
	);
};

export default ButtonBlock;