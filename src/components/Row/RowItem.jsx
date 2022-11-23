import React from 'react';
import RowTitle from './RowTitle';
import RowPallets from "./RowPallets";
import { Card } from 'flowbite-react';





const RowItem = (

	{

		isRowEditing,
		title,
		setTitle,
		pallets,


	}


) => {







	return (
		<Card
			className='
			mx-auto
	
		'>

			<RowTitle
				isRowEditing={isRowEditing}
				title={title}
				setTitle={setTitle}


			/>




			<RowPallets
				pallets={pallets}



			/>



		</Card>
	);
};

export default RowItem;