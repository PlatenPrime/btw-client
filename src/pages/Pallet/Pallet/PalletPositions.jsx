import React, { useEffect, useState } from 'react';
import PalletPosition from './PalletPosition';
import { ButtonBlock, CellBlock, InputBlock, RowBlock, TextBlock, CardBlock  } from '../../../components';








const PalletPositions = ({ positions, setPositions, isPalletEditing }) => {


	// States


	const [newPositions, setNewPositions] = useState(null);




	useEffect(() => {
		setNewPositions(positions)
	}, [positions])










	return (


		<>

			{newPositions &&

				<CardBlock className='  flex  flex-col items-center p-3 space-y-2'>

					<TextBlock className=" w-full text-2xl text-white   rounded m-1 p-3 bg-rose-500" >
						Позиции
					</TextBlock>

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


				</CardBlock>

			}


		</>
	);
};

export default PalletPositions;