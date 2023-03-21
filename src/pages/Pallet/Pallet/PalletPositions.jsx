import React, { useEffect, useState } from 'react';
import PalletPosition from './PalletPosition';









const PalletPositions = ({ positions, setPositions, isPalletEditing }) => {


	// States


	const [newPositions, setNewPositions] = useState(null);




	useEffect(() => {
		setNewPositions(positions)
	}, [positions])










	return (


		<div className='flex justify-center my-4'>

			{newPositions &&

				<div className='space-y-3'>

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


				</div>

			}


		</div>
	);
};

export default PalletPositions;