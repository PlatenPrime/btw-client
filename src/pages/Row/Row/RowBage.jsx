import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RowBlock from '../../../components/blocks/RowBlock';
import TextBlock from '../../../components/blocks/TextBlock';






const RowBage = ({ row }) => {



	if (!row) {
		return (
			<TextBlock className='text-center text-3xl'>
				Загрузка...
			</TextBlock>
		)
	}



	return (

		<RowBlock>

			<Link

				to={`${row._id}`}


				className=' 
			flex justify-center
			bg-orange-100 hover:bg-orange-500 
			 hover:text-white 
			border-2 
border-gray-600 hover:border-gray-700
			rounded transition ease-in-out duration-300
			w-full p-3
			text-gray-900
			'
			>


				{row.title}



			</Link>

		</RowBlock>

	);
};

export default RowBage;