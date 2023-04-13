import React from 'react';







const ContentMain = ({ children, className }) => {


	const style = `
	
	ContentMain
	${className}

`





	return (
		<div className={style} >
			{children}
		</div>
	);
};

export default ContentMain;
