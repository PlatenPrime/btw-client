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
					className='p-2 flex justify-center   text-black   
					bg-sky-500
		hover:bg-sky-400 transition ease-out duration-300
					border-x-8 border-x-slate-300
					border-y-4 border-y-orange-400 hover:border-y-orange-500
					hover:shadow-lg
	rounded
					'>

					<span
						className='flex p-1 bg-white items-center text-xl
					transition ease-out duration-300
					rounded
					'



					>{row.title}</span>

				</div>

			</Link>




		</div>
	);
};

export default RowBage;