import React from 'react';

const ContainerBlock = ({ children, className, onClick }) => {

	const style = `

bg-slate-800/50 rounded-2xl p-2 
	
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