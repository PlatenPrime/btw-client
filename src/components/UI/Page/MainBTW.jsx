import React from 'react';

const MainBTW = ({ children, className }) => {

	const style = `
	
	MainBTW
	${className}

`




	return (
		<div className={style}>
			{children}
		</div>
	);
};

export default MainBTW;