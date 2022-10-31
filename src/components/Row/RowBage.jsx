import React, { useState } from 'react';
import { Link } from 'react-router-dom';





const RowBage = ({ row }) => {



	if (!row) {
		return (
			<div className='text-xl text-center text-white py-10'>
				Загрузка...
			</div>
		)
	}



	return (
		<div className='flex flex-col justify-center my-3 ' >



			<Link to={`${row._id}`} className='' >

				<div
					className='p-2 flex justify-center   text-white   
					border-x-8 border-x-slate-400
					border-y-4 border-y-orange-500'>

					<span className='flex  items-center text-xl '>{row.title}</span>

				</div>

			</Link>




		</div>
	);
};

export default RowBage;