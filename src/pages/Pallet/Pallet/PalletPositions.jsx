import React, { useEffect, useState } from 'react';
import PalletPosition from './PalletPosition';
import CellBlock from '../../../components/blocks/CellBlock';
import CardBlock from '../../../components/blocks/CardBlock';









const PalletPositions = ({ positions, setPositions, isPalletEditing }) => {


	// States


	const [newPositions, setNewPositions] = useState(null);




	useEffect(() => {
		setNewPositions(positions)
	}, [positions])










	return (


		<CardBlock className='flex justify-center my-2 p-3'>

			{newPositions &&

				<CellBlock className='flex-col space-y-3'>

					{
						newPositions.map((position) => {
							return (

								<PalletPosition

									art={position.art}
									pieces={position.pieces}

									id={position.id}
									key={position.id}

									positions={positions}
									setPositions={setPositions}
									isPalletEditing={isPalletEditing}

								/>


							)
						})
					}


				</CellBlock>

			}


		</CardBlock>
	);
};

export default PalletPositions;