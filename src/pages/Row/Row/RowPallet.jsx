
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import RowBlock from '../../../components/blocks/RowBlock';








const RowPallet = ({ title, id }) => {





	return (

		<RowBlock>

			<Link
				className=' flex justify-center
				w-full  p-3 rounded 
				border-2 border-amber-500 hover:border-orange-700


				bg-orange-100  hover:bg-amber-500

				
				text-amber-700 hover:text-white
			transition ease-in-out duration-300
			
			
			
			'


				to={`/pallets/${id}`}
			>
				{title}
			</Link>

		</RowBlock>

	);
};

export default RowPallet;



