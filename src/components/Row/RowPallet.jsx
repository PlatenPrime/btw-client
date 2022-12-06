import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import CardBTW from '../UI/CardBTW';







const RowPallet = ({ title, id }) => {





	return (



		<Link
			className=' flex justify-center
			
			bg-amber-100 hover:bg-amber-500
			rounded transition ease-in-out duration-300
			w-full md:w-fit p-5
			shadow-md hover:shadow-xl
			text-gray-800 hover:text-white
			
			'


			to={`/pallets/${id}`}
		>
			{title}
		</Link>



	);
};

export default RowPallet;



