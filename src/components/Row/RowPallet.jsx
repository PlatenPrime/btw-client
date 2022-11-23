import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";







const RowPallet = ({ title, id }) => {





	return (

		<Card className='my-1 bg-slate-300'>

			<Link to={`/pallets/${id}`}>{title}</Link>


		</Card>
	);
};

export default RowPallet;



