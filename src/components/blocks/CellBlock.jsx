import React from 'react';

const CellBlock = ({ children, className }) => {

	const style = `
	CellBlock
	${className}

`


	return (
		<div
			className={style}
		>

			{children}

		</div>
	);
};

export default CellBlock;