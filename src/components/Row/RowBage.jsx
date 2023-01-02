import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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



		<Link

			to={`${row._id}`}


			className=' flex justify-center
			bg-slate-100 hover:bg-orange-400
			border-2 border-sky-400  hover:border-orange-100
			rounded transition ease-in-out duration-300
			w-full p-2
			shadow-sm hover:shadow-lg
			text-gray-800 hover:text-white
			
			'
		>


			{row.title}



		</Link>



	);
};

export default RowBage;