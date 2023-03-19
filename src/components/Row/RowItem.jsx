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
			className=' mx-auto '>

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