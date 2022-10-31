import React, { useEffect, useState } from 'react';
import { Link, NavLink } from "react-router-dom";







const RowPallet = ({ title, id }) => {





	return (

		<div className='text-white bg-blue-600 text-lg flex justify-center m-2'>

			<Link to={`/pallets/${id}`}>{title}</Link>


		</div>
	);
};

export default RowPallet;



