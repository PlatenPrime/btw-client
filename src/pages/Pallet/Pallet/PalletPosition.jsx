import React, { useEffect, useState } from 'react';




import ButtonBlock from '../../../components/blocks/ButtonBlock';
import CellBlock from '../../../components/blocks/CellBlock';
import InputBlock from '../../../components/blocks/InputBlock';
import RowBlock from '../../../components/blocks/RowBlock';


import TextBlock from '../../../components/blocks/TextBlock';



import { BiSave } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";




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



		<RowBlock className="w-full grid grid-cols-3 grid-rows-2" >



			{isPalletEditing && isPositionEditing ?


				(<CellBlock
					className=' w-full col-span-2 row-span-2 '
				>

					<InputBlock type="text"
						className='col-span-1  bg-rose-500 bg-opacity-50 p-1 text-xl text-white text-center '
						value={newArt}
						onChange={(e) => setNewArt(e.target.value)}

					/>
					

					<InputBlock type="number"
						className='col-span-1 bg-purple-500 bg-opacity-50  p-1 text-xl text-white text-center  '
						value={newPieces}
						onChange={(e) => setNewPieces(e.target.value)}
					/>


				</CellBlock>)

				:


				(<CellBlock
					className='w-full col-span-2 flex justify-between  '
				>
					<TextBlock className=' text-xl min-w-xl text-white rounded bg-rose-500 p-1'>
						{newArt}
					</TextBlock>

					

					<TextBlock className='  text-xl text-white rounded bg-purple-500 p-1' >
						{newPieces}
					</TextBlock>

				</CellBlock>)
			}



			{isPalletEditing &&

				<CellBlock>


					{isPositionEditing ?

						<CellBlock className=''>



							<ButtonBlock
								className='inline success text-xl '
								onClick={() => handlerPositionSave(id)}
							>
								<BiSave />
							</ButtonBlock>

							<ButtonBlock
								className='inline delete text-xl '
								onClick={() => handlerPositionDelete(id)}
							>
								<BiTrash />
							</ButtonBlock>



						</CellBlock>


						:



						<CellBlock className=''>

							<ButtonBlock
								className='edit text-xl  '
								onClick={() => handlerPositionEdit(id)}
							>
								<BiEditAlt />
							</ButtonBlock>

						</CellBlock>
					}

				</CellBlock>


			}

		</RowBlock>
	);
};

export default PalletPosition;