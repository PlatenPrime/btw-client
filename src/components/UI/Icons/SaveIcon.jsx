import React from 'react';

const SaveIcon = () => {
	return (
		<div className='flex justify-center items-center
		p-1 rounded
		bg-green-500 text-white  hover:bg-green-400  focus:bg-green-600  active:bg-green-700
		'

		>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
				<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>



		</div>
	);
};

export default SaveIcon;