import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';


import { getAllRows } from '../../redux/features/row/rowSlice';



import RowBage from "../../components/Row/RowBage";
import { Button, Card } from 'flowbite-react';




const RowsPage = () => {

	// State


	const dispatch = useDispatch();
	const { rows } = useSelector((state) => state.row);


	useEffect(() => {
		dispatch(getAllRows())
	}, [dispatch])







	return (



		<Card className='mx-auto my-5'  >

			<Link to="new"

			><Button className='w-full' >Создать новый ряд</Button></Link>

			{!rows.length ?

				<div className=''>
					В базе данных нет ни одного ряда.
				</div>
				:

				<div className=''>
					<h2 className='text-xl'>В базе данных на текущий момент есть такие ряды:</h2>
					{rows?.map((row, idx) => (
						<RowBage key={idx} row={row} />
					))}
				</div>


			}

		</Card >


	);
};

export default RowsPage;