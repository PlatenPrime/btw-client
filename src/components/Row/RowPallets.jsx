import { Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import CardBTW from '../UI/CardBTW';
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

				<div className='space-y-4 w-full md:grid  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5'>

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