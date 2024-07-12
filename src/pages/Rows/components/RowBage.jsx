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
			 text-2xl  hover:text-white 
			  
			bg-gradient-to-b from-orange-500/50 to-orange-700/50
			  hover:bg-orange-500
			 hover:shadow-lg hover:shadow-orange-500 
			 transition ease-in-out duration-500
			
			'
			>

				<TextBlock
					className="text-black bg-white text-4xl  p-1 rounded-xl"
				>
					{row.title}
				</TextBlock>


			</Link>

		</RowBlock>

	);
};

export default RowBage;