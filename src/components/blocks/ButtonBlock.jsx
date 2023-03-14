import React from 'react';

const ButtonBlock = ({ className, onClick, disabled, children }) => {


	const style = `p-2 m-1 block rounded  
transition ease-in-out duration-300
bg-gray-600 text-white
${className}  `


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