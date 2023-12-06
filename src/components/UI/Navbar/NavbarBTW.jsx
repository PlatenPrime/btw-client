import React from 'react';


const NavbarBTW = ({ onClickSide, onClickControl, mobileControl }) => {




	return (
		
		<div className='h-16 w-full p-4 xl:hidden
		flex justify-between  items-center
		bg-sky-900/20 text-white text-3xl' >

			<button
				className=''
				onClick={onClickSide}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
					<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>

			</button>




		</div >



	);
};

export default NavbarBTW;