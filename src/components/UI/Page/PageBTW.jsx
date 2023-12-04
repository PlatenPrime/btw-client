import React from 'react';

const PageBTW = ({ children, className }) => {


	const style = `
	PageBTW
	${className}
`


	return (

				<div className={style}>
					{children}
				</div>

	);
};

export default PageBTW;