
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import RowBlock from '../blocks/RowBlock';








const RowPallet = ({ title, id }) => {





	return (

		<RowBlock>

			<Link
				className=' flex justify-center
			border-sky-600 hover:border-sky-700
			rounded transition ease-in-out duration-300
			w-full  p-3
			text-black hover:text-gray-700
			
			'


				to={`/pallets/${id}`}
			>
				{title}
			</Link>

		</RowBlock>

	);
};

export default RowPallet;



