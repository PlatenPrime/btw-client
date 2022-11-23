import { Card } from 'flowbite-react';
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
		<Card className='my-2 flex justify-center mx-auto ' >



			<Link to={`${row._id}`} className='' >

				<div
					className='
					'>

					{row.title}

				</div>

			</Link>




		</Card>
	);
};

export default RowBage;