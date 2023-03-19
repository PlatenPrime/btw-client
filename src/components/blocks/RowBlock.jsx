import React from 'react';
import { Link } from 'react-router-dom';

const RowBlock = ({ children, className}) => {



	return (
		<div  
		className=' 
		flex justify-center
		my-1 w-full 
		rounded transition ease-in-out duration-300
		shadow-xs hover:shadow-lg
		border
			'
		
		
		>
			{children}
		</div>
	);
};

export default RowBlock;