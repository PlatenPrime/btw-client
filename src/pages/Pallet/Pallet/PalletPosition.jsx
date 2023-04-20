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



		<RowBlock className="w-full p-1 flex flex-col items-center md:flex-row    bg-white bg-opacity-10  " >



			{isPalletEditing && isPositionEditing ?


				(<CellBlock
					className='w-full md:w-4/5 flex flex-col xl:flex-row justify-around  '
				>

					<InputBlock type="text"
						className='  bg-rose-700 focus:bg-rose-900 p-1 text-xl text-white text-center '
						value={newArt}
						onChange={(e) => setNewArt(e.target.value)}

					/>


					<InputBlock type="number"
						className=' bg-purple-700 focus:bg-purple-900   p-1 text-xl text-white text-center  '
						value={newPieces}
						onChange={(e) => setNewPieces(e.target.value)}
					/>


				</CellBlock>)

				:


				(<CellBlock
					className=' w-full md:w-4/5 flex justify-evenly space-x-3'
				>
					<TextBlock className='w-1/2 text-xl min-w-xl text-white rounded bg-rose-500 p-1'>
						{newArt}
					</TextBlock>



					<TextBlock className=' w-1/2 text-xl text-white rounded bg-purple-500 p-1' >
						{newPieces}
					</TextBlock>

				</CellBlock>)
			}



			{isPalletEditing &&

				<CellBlock className=" w-full md:w-1/5" >


					{isPositionEditing ?

						<>
							<ButtonBlock
								className=' w-1/2 inline success text-xl flex justify-center '
								onClick={() => handlerPositionSave(id)}
							>
								<BiSave />
							</ButtonBlock>

							<ButtonBlock
								className=' w-1/2 inline delete text-xl flex justify-center'
								onClick={() => handlerPositionDelete(id)}
							>
								<BiTrash />
							</ButtonBlock>
						</>


						:





						<ButtonBlock
							className='edit text-xl w-full flex justify-center  '
							onClick={() => handlerPositionEdit(id)}
						>
							<BiEditAlt />
						</ButtonBlock>


					}

				</CellBlock>


			}

		</RowBlock>
	);
};

export default PalletPosition;