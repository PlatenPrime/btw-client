import React from 'react';
import { Link } from 'react-router-dom';
import {  RowBlock, TextBlock } from '../../../components';





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
				group
			flex justify-center
		w-full p-2
			rounded-xl
			 text-2xl text-orange-100 hover:text-white 
			  
			bg-gradient-to-b from-orange-500/70 to-orange-900/50
			hover:bg-orange-500
			 hover:shadow-lg hover:shadow-orange-500 
			 transition ease-in-out duration-500
			
			'
			>

				<TextBlock
					className="text-black bg-white  p-2 rounded-xl"
				>
					{row.title}
				</TextBlock>


			</Link>

		</RowBlock>

	);
};

export default RowBage;