import React from 'react';


const NavbarBTW = ({ onClickSide, onClickControl }) => {




	return (
		<div className='h-16 w-full p-4 md:hidden
		flex justify-between items-center
		 bg-sky-700 text-white' >

			<button
				className=''
				onClick={onClickSide}
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
				</svg>

			</button>


			<button
				onClick={onClickControl}
			>


				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
				</svg>


			</button>






		</div >



	);
};

export default NavbarBTW;