import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PalletBage from '../../components/Pallet/PalletBage';
import ControlBTW from '../../components/UI/ControlBTW';
import MainBTW from '../../components/UI/MainBTW';
import PageBTW from '../../components/UI/Page/PageBTW';
import CreateButton from "../../components/UI/Buttons/CreateButton";

import { getAllPallets } from '../../redux/features/pallet/palletSlice';
import HeaderMainBTW from '../../components/UI/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Header/TitleHeaderMain';







const PalletsPage = () => {

	const dispatch = useDispatch();
	const { pallets } = useSelector((state) => state.pallet);



	useEffect(() => {
		dispatch(getAllPallets())
	}, [dispatch])






	return (

		<PageBTW  >

			<MainBTW>

				<HeaderMainBTW>
					<TitleHeaderMain>
						Паллеты
					</TitleHeaderMain>
				</HeaderMainBTW>


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

			</MainBTW>

			<ControlBTW>

				<Link to="new">
					<CreateButton >
						Создать новую паллету
					</CreateButton>
				</Link>

			</ControlBTW>

		</PageBTW >
	);
};

export default PalletsPage;