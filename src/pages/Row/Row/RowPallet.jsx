
import React from 'react';
import { Link, NavLink } from "react-router-dom";









const RowPallet = ({ title, id }) => {





	return (

	

			<Link
				className=' w-full
				flex flex-col items-center justify-start
				  p-3 my-1 rounded 
				border-2 border-gray-500 hover:border-amber-500
				 bg-transparent  
				text-amber-100 hover:text-white
				 shadow-inner hover:shadow-amber-500
			transition ease-in-out duration-300
			
			
			
			'


				to={`/pallets/${id}`}
			>
				{title}
			</Link>

		

	);
};

export default RowPallet;



