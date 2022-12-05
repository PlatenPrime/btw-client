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
		<CardBTW className='my-2 flex justify-center mx-auto ' >



			<Link to={`${row._id}`} className='w-full mx-auto flex justify-center' >

				<div
					className='w-full mx-auto flex justify-center border-2 border-red-500'>

					{row.title}

				</div>

			</Link>




		</CardBTW>
	);
};

export default RowBage;