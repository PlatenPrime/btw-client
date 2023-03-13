
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import RowBlock from '../blocks/RowBlock';








const RowPallet = ({ title, id }) => {





	return (

		<RowBlock>

			<Link
				className=' flex justify-center
			
			bg-sky-700 hover:bg-sky-600
			rounded transition ease-in-out duration-300
			w-full  p-3
			text-gray-100 hover:text-white
			
			'


				to={`/pallets/${id}`}
			>
				{title}
			</Link>

		</RowBlock>

	);
};

export default RowPallet;



