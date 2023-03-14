import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RowBlock from '../blocks/RowBlock';
import CardBTW from '../UI/CardBTW';





const RowBage = ({ row }) => {



	if (!row) {
		return (
			<div className=''>
				Загрузка...
			</div>
		)
	}



	return (

<RowBlock>

		<Link

			to={`${row._id}`}


			className=' 
			flex justify-center
			bg-orange-500 hover:bg-orange-400
			border-2 
			rounded transition ease-in-out duration-300
			w-full p-3
			
			text-white hover:text-gray-100
			
			'
		>


			{row.title}



		</Link>

		</RowBlock>

	);
};

export default RowBage;