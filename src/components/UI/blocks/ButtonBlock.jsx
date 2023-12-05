import React from 'react';

const ButtonBlock = ({ className, onClick, disabled, children, type, disabledClassName }) => {




	const style = disabled ?
		`ButtonBlock disabled ${disabledClassName}`
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