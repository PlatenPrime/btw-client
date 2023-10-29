import React from 'react';
import { Link } from 'react-router-dom';
import { RowBlock, TextBlock } from '../../components';





const RowBage = ({ row }) => {



	if (!row) {
		return (
			<TextBlock className='text-center text-3xl'>
				Загрузка...
			</TextBlock>
		)
	}



	return (

		<RowBlock className='w-full'  >

			<Link

				to={`/rows/${row._id}`}


				className=' 
			flex justify-center
		w-full p-3
			rounded
			 text-2xl text-orange-100 hover:text-white 
			bg-orange-500/10 hover:bg-orange-500 
			border-2 border-orange-500 
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