import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PalletBage from '../../pages/Pallet/Pallet/PalletBage';



import PageBTW from '../../components/UI/Page/PageBTW';


import { getAllPallets } from '../../redux/features/pallet/palletSlice';

import { ButtonBlock, CellBlock, InputBlock, RowBlock, TextBlock, CardBlock , HeaderBlock } from '../../components';






const PalletsPage = () => {

	const dispatch = useDispatch();
	const { pallets } = useSelector((state) => state.pallet);



	useEffect(() => {
		dispatch(getAllPallets())
	}, [dispatch])






	return (

		<PageBTW  >


			<HeaderBlock>

				Паллеты

			</HeaderBlock>







			<CardBlock>

				<Link to="new">
					<ButtonBlock
						className='add'
					>
						Создать новую паллету
					</ButtonBlock>
				</Link>

			</CardBlock>


			{!pallets.length ?

				<div className=''>
					В базе данных нет ни одной паллеты.
				</div>
				:

				<div className='space-y-8'>
					<h2 className=''>В базе данных на текущий момент есть такие паллеты:</h2>
					{pallets?.map((pallet, idx) => (
						<PalletBage key={idx} pallet={pallet} />
					))}
				</div>


			}



		</PageBTW >
	);
};

export default PalletsPage;