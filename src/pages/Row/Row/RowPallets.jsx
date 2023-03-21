
import React, { useEffect, useState } from 'react';
import CardBTW from '../../../components/UI/CardBTW';
import RowPallet from "./RowPallet";




const RowPallets = ({ pallets }) => {


	// States


	const [newPallets, setNewPallets] = useState(null);


	useEffect(() => {
		setNewPallets(pallets)
	}, [pallets])







	return (


		<CardBTW >

			{newPallets &&

				<div className=' w-full'>

					{
						newPallets.map((pallet) => {
							return (

								<RowPallet

									title={pallet.title}
									id={pallet._id}
									key={pallet._id}


								/>


							)
						})
					}


				</div>

			}


		</CardBTW>


	);
};

export default RowPallets;