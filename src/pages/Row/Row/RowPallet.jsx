
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import RowBlock from '../../../components/blocks/RowBlock';








const RowPallet = ({ title, id }) => {





	return (

		<RowBlock>

			<Link
				className=' flex justify-center
				w-full  p-3 rounded 
				border-2 border-sky-700 hover:border-sky-900
				bg-sky-100 hover:bg-sky-500
				text-sky-900 hover:text-gray-100
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



