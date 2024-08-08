import React from 'react';

const ContainerBlock = ({ children, className, onClick }) => {

	const style = `

bg-gradient-to-b from-slate-700/50 to-slate-800/50 rounded-2xl lg:p-2   
	
	${className}

`


	return (
		<div className={style}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default ContainerBlock;