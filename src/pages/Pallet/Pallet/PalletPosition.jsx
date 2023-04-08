import React, { useEffect, useState } from 'react';




import ButtonBlock from '../../../components/blocks/ButtonBlock';
import CellBlock from '../../../components/blocks/CellBlock';
import InputBlock from '../../../components/blocks/InputBlock';
import RowBlock from '../../../components/blocks/RowBlock';

import DeleteIcon from '../../../components/UI/Icons/DeleteIcon';
import EditIcon from '../../../components/UI/Icons/EditIcon';
import SaveIcon from '../../../components/UI/Icons/SaveIcon';
import TextBlock from '../../../components/blocks/TextBlock';




const PalletPosition = ({ positions, setPositions, isPalletEditing, art, pieces, id }) => {



	// States

	const [isPositionEditing, setIsPositionEditing] = useState(false);

	const [newArt, setNewArt] = useState("");
	const [newPieces, setNewPieces] = useState("");



	useEffect(() => {
		setNewArt(art)
		setNewPieces(pieces)
	}, [art, pieces])





	// Position CRUD

	const deletePosition = (id) => {
		window.confirm("Удалить эту позицию с паллеты?") &&
			setPositions(positions.filter((position) => position.id !== id));

	};


	const updatePosition = (id) => {
		setPositions(

			positions.map((position) => {
				if (position.id === id) {
					const art = newArt;
					const pieces = newPieces;
					return { ...position, art, pieces }
				} else {
					return position;
				}
			})

		)
	}


	// Position handlers


	const handlerPositionEdit = (id) => {
		setIsPositionEditing(true)
	}

	const handlerPositionSave = (id) => {
		updatePosition(id)
		setIsPositionEditing(false)
	}

	const handlerPositionDelete = (id) => {
		deletePosition(id)
	}





	return (



		<RowBlock className="" >



			{isPalletEditing && isPositionEditing ?


				<CellBlock>

					<InputBlock type="text"
						className=''
						value={newArt}
						onChange={(e) => setNewArt(e.target.value)}

					/>

					<InputBlock type="number"
						className=''
						value={newPieces}
						onChange={(e) => setNewPieces(e.target.value)}
					/>


				</CellBlock>

				:
				<CellBlock
					className='space-x-3 flex justify-start items-center p-3 border-2 border-sky-500 rounded'
				>
					<TextBlock className='text-xl text-white rounded bg-rose-500 p-1'>
						{newArt}
					</TextBlock>

					<TextBlock className='text-xl'>:</TextBlock>

					<TextBlock className='text-xl text-white rounded bg-purple-500 p-1' >
						{newPieces} шт
					</TextBlock>

				</CellBlock>
			}



			{isPalletEditing &&

				<CellBlock>


					{isPositionEditing ?

						<CellBlock className=''>

						

							<ButtonBlock
								className='inline success  '
								onClick={() => handlerPositionSave(id)}
							>
								<SaveIcon />
							</ButtonBlock>

							<ButtonBlock
								className='inline delete  '
								onClick={() => handlerPositionDelete(id)}
							>
								<DeleteIcon />
							</ButtonBlock>



						</CellBlock>


						:



						<CellBlock className=''>

							<ButtonBlock
								className='edit  '
								onClick={() => handlerPositionEdit(id)}
							>
								<EditIcon />
							</ButtonBlock>

						</CellBlock>
					}

				</CellBlock>


			}

		</RowBlock>
	);
};

export default PalletPosition;