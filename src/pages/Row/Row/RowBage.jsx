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

		<RowBlock  className='w-full'  >

			<Link

				to={`/rows/${row._id}`}


				className=' 
			flex justify-center
		w-full p-3
			rounded
			 text-2xl text-orange-100 hover:text-white 
			bg-orange-500/10 hover:bg-orange-500 
			border-2 border-gray-600 hover:border-orange-500 
			 hover:shadow-2xl hover:shadow-orange-500 
			 transition ease-in-out duration-300
			
			'
			>


				{row.title}



			</Link>

		</RowBlock>

	);
};

export default RowBage;