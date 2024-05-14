import React from 'react';

const PageBTW = ({ children, className }) => {


	const style = `
	PageBTW sm:container mx-auto px-1 w-full
	${className}
`











	return (

				<div className={style}>
					{children}
				</div>

	);
};

export default PageBTW;