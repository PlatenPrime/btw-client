import React from 'react';

const ListBlock = ({ children }) => {



	return (
		<div className='p-1 my-1 space-y-1 w-full'  >
			{children}
		</div>
	);
};

export default ListBlock;