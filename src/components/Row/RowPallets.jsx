import React, { useEffect, useState } from 'react';
import RowPallet from "./RowPallet";




const RowPallets = ({ pallets }) => {


	// States


	const [newPallets, setNewPallets] = useState(null);


	useEffect(() => {
		setNewPallets(pallets)
	}, [pallets])







	return (


		<div>

			{newPallets &&

				<div className=''>

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


		</div>


	);
};

export default RowPallets;