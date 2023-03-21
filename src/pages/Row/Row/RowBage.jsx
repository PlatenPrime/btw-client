import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RowBlock from '../../../components/blocks/RowBlock';






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
			 hover:bg-orange-100
			border-2 
border-orange-600 hover:border-orange-700
			rounded transition ease-in-out duration-300
			w-full p-3
			text-orange-900
			
			'
		>


			{row.title}



		</Link>

		</RowBlock>

	);
};

export default RowBage;