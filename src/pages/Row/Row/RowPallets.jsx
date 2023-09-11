
import React, { useEffect, useState } from 'react';
import ListBlock from '../../../components/blocks/ListBlock';
import RowPallet from "./RowPallet";




const RowPallets = ({ pallets }) => {


	// States


	const [newPallets, setNewPallets] = useState(null);


	useEffect(() => {
		setNewPallets(pallets)
	}, [pallets])







	return (


		< >

			{newPallets &&

				<ListBlock className=' 
				w-full 
				flex flex-col 
				md:grid md:grid-cols-2
				lg:grid-cols-4 
				xl:grid-cols-6 gap-1 '>

					{
						newPallets.map((pallet) => {
							return (

								<RowPallet

									title={pallet?.title}
									id={pallet?._id}
									key={pallet?._id}


								/>


							)
						})
					}


				</ListBlock>

			}


		</>


	);
};

export default RowPallets;