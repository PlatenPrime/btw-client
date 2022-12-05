import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import CardBTW from '../UI/CardBTW';







const RowPallet = ({ title, id }) => {





	return (

		<CardBTW className='my-1 bg-slate-400 w-full mx-auto '>

			<Link className=' flex justify-center' to={`/pallets/${id}`}>{title}</Link>


		</CardBTW>
	);
};

export default RowPallet;



