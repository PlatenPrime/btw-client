import React from 'react';


const NavbarBTW = ({ onClickSide }) => {




	return (
		<div className='h-16 w-full p-4 md:hidden
		flex justify-between items-center
		 bg-sky-700 text-white' >


			<div>BTW</div>

			<button
				className=''
				onClick={onClickSide}
			>
				Кнопочка
			</button>




		</div >



	);
};

export default NavbarBTW;