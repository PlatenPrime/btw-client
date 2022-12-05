import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';


import { getAllRows } from '../../redux/features/row/rowSlice';



import RowBage from "../../components/Row/RowBage";
import { Button, Card } from 'flowbite-react';
import CardBTW from '../../components/UI/CardBTW';
import PageBTW from '../../components/UI/PageBTW';
import ControlBTW from '../../components/UI/ControlBTW';
import MainBTW from '../../components/UI/MainBTW';
import EditButton from '../../components/UI/Buttons/EditButton';
import CreateButton from '../../components/UI/Buttons/CreateButton';
import HeaderPageBTW from '../../components/UI/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Header/TitleHeaderMain';




const RowsPage = () => {

	// State


	const dispatch = useDispatch();
	const { rows } = useSelector((state) => state.row);


	useEffect(() => {
		dispatch(getAllRows())
	}, [dispatch])







	return (



		<PageBTW  >



			<MainBTW>

				<HeaderPageBTW>
					<TitleHeaderMain>
						Ряды
					</TitleHeaderMain>
				</HeaderPageBTW>

				{!rows.length ?
					<div className=''>
						В базе данных нет ни одного ряда.
					</div>
					:
					<div className=''>

						{rows?.map((row, idx) => (
							<RowBage key={idx} row={row} />
						))}
					</div>
				}
			</MainBTW>



			<ControlBTW>
				<Link to="new"	>
					<CreateButton >Создать новый ряд</CreateButton>
				</Link>
			</ControlBTW>

		</PageBTW >


	);
};

export default RowsPage;