import React from 'react';
import { Link } from 'react-router-dom';
import { CardBlock, RowBlock, TextBlock } from '../../components';





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
			rounded-xl
			 text-2xl text-orange-100 hover:text-white 
			 hover:bg-orange-500 
			bg-orange-500/30
			 hover:shadow-lg hover:shadow-orange-500 
			 transition ease-in-out duration-500
			
			'
			>

				<TextBlock
					className="text-black bg-white px-2 rounded-xl"
				>
					{row.title}
				</TextBlock>


			</Link>

		</RowBlock>

	);
};

export default RowBage;