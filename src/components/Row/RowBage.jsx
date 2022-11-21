import React, { useState } from 'react';
import { Link } from 'react-router-dom';





const RowBage = ({ row }) => {



	if (!row) {
		return (
			<div className=''>
				Загрузка...
			</div>
		)
	}



	return (
		<div className=' ' >



			<Link to={`${row._id}`} className='' >

				<div
					className='
					'>

					<span
						className='
					'



					>{row.title}</span>

				</div>

			</Link>




		</div>
	);
};

export default RowBage;