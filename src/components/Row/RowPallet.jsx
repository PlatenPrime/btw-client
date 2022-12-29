
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";








const RowPallet = ({ title, id }) => {





	return (



		<Link
			className=' flex justify-center
			my-1
			bg-sky-700 hover:bg-sky-500
			rounded transition ease-in-out duration-300
			w-full md:w-fit p-5
			shadow-md hover:shadow-xl
			text-gray-100 hover:text-white
			
			'


			to={`/pallets/${id}`}
		>
			{title}
		</Link>



	);
};

export default RowPallet;



