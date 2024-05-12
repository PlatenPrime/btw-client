import React from 'react';

const PageBTW = ({ children, className }) => {


	const style = `
	PageBTW container mx-auto px-1
	${className}
`


	return (

				<div className={style}>
					{children}
				</div>

	);
};

export default PageBTW;