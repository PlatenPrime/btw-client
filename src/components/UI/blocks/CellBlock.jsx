import React from 'react';

const CellBlock = ({ children, className }) => {

	const style = `
	CellBlock
	${className}

`


	return (
		<section
			className={style}
		>

			{children}

		</section>
	);
};

export default CellBlock;