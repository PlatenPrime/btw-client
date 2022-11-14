import React from 'react';
import RowTitle from './RowTitle';
import RowPallets from "./RowPallets";





const RowItem = (

	{

		isRowEditing,
		title,
		setTitle,
		pallets,


	}


) => {







	return (
		<div
			className='space-y-10 my-10 
		border border-red-500
		
		
		'>

			<RowTitle
				isRowEditing={isRowEditing}
				title={title}
				setTitle={setTitle}


			/>




			<RowPallets
				pallets={pallets}



			/>



		</div>
	);
};

export default RowItem;