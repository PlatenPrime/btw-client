import React, { useEffect, useState } from 'react';




import ButtonBlock from '../../../components/blocks/ButtonBlock';
import CellBlock from '../../../components/blocks/CellBlock';
import InputBlock from '../../../components/blocks/InputBlock';
import RowBlock from '../../../components/blocks/RowBlock';

import DeleteIcon from '../../../components/UI/Icons/DeleteIcon';
import EditIcon from '../../../components/UI/Icons/EditIcon';
import SaveIcon from '../../../components/UI/Icons/SaveIcon';




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
					className='space-x-3 flex justify-start items-center p-3'
				>
					<span className='text-xl bg-sky-300 p-1'>
						{newArt}
					</span>

					<span className='text-xl'>:</span>

					<span className='text-xl bg-red-300 p-1' >
						{newPieces} шт
					</span>

				</CellBlock>
			}



			{isPalletEditing &&

				<div>


					{isPositionEditing ?

						<div className=''>

						

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



						</div>


						:



						<div className=''>

							<ButtonBlock
								className='edit  '
								onClick={() => handlerPositionEdit(id)}
							>
								<EditIcon />
							</ButtonBlock>

						</div>
					}

				</div>


			}

		</RowBlock>
	);
};

export default PalletPosition;