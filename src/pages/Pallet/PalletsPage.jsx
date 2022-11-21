import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PalletBage from '../../components/Pallet/PalletBage';

import { getAllPallets } from '../../redux/features/pallet/palletSlice';







const PalletsPage = () => {

	const dispatch = useDispatch();
	const { pallets } = useSelector((state) => state.pallet);



	useEffect(() => {
		dispatch(getAllPallets())
	}, [dispatch])






	return (

		<div className=''  >

			<Link to="new">
				<button className='' >
					Создать новую паллету
				</button>
			</Link>


			{!pallets.length ?

				<div className=''>
					В базе данных нет ни одной паллеты.
				</div>
				:

				<div className=''>
					<h2 className=''>В базе данных на текущий момент есть такие паллеты:</h2>
					{pallets?.map((pallet, idx) => (
						<PalletBage key={idx} pallet={pallet} />
					))}
				</div>


			}





		</div >
	);
};

export default PalletsPage;