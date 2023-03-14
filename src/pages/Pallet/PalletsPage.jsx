import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PalletBage from '../../components/Pallet/PalletBage';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import MainBTW from '../../components/UI/Page/MainBTW';
import PageBTW from '../../components/UI/Page/PageBTW';


import { getAllPallets } from '../../redux/features/pallet/palletSlice';
import HeaderMainBTW from '../../components/UI/Page/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Page/Header/TitleHeaderMain';

import ContentMain from '../../components/UI/Page/ContentMain';
import ButtonBlock from '../../components/blocks/ButtonBlock';







const PalletsPage = () => {

	const dispatch = useDispatch();
	const { pallets } = useSelector((state) => state.pallet);



	useEffect(() => {
		dispatch(getAllPallets())
	}, [dispatch])






	return (

		<PageBTW  >


			<HeaderMainBTW>
				<TitleHeaderMain>
					Паллеты
				</TitleHeaderMain>
			</HeaderMainBTW>



			<MainBTW>


				<ContentMain>

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


				</ContentMain>







				<ControlBTW>

					<Link to="new">
						<ButtonBlock
							className=''
						>
							Создать новую паллету
						</ButtonBlock>
					</Link>

				</ControlBTW>





			</MainBTW>



		</PageBTW >
	);
};

export default PalletsPage;