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
			bg-slate-100 hover:bg-orange-400
			border-2 
			rounded transition ease-in-out duration-300
			w-full p-3
			
			text-gray-800 hover:text-white
			
			'
		>


			{row.title}



		</Link>

		</RowBlock>

	);
};

export default RowBage;