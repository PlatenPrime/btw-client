import React from 'react';
import RowTitle from './RowTitle';
import RowPallets from "./RowPallets";
import { Card } from 'flowbite-react';
import CardBTW from '../UI/CardBTW';





const RowItem = (

	{

		isRowEditing,
		title,
		setTitle,
		pallets,


	}


) => {







	return (
		<CardBTW
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



		</CardBTW>
	);
};

export default RowItem;