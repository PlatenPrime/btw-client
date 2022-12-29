import React, { useEffect, useState } from 'react';

import DeleteIcon from '../UI/Icons/DeleteIcon';
import EditIcon from '../UI/Icons/EditIcon';
import SaveIcon from '../UI/Icons/SaveIcon';




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



		<div className="flex space-x-3 ">



			{isPalletEditing && isPositionEditing ?


				<div className=''>

					<input type="text"
						className='inputBTW'
						value={newArt}
						onChange={(e) => setNewArt(e.target.value)}

					/>

					<input type="number"
						className='inputBTW'
						value={newPieces}
						onChange={(e) => setNewPieces(e.target.value)}
					/>


				</div>

				:
				<div
					className='space-x-3 flex justify-start items-center'
				>
					<span className='text-xl bg-sky-300 p-1'>
						{newArt}
					</span>

					<span className='text-xl'>:</span>

					<span className='text-xl bg-red-300 p-1' >
						{newPieces} шт
					</span>

				</div>
			}



			{isPalletEditing &&

				<div className=''>


					{isPositionEditing ?

						<div className=''>

							<button
								className='   '
								onClick={() => handlerPositionDelete(id)}
							>
								<DeleteIcon />
							</button>

							<button
								className='   '
								onClick={() => handlerPositionSave(id)}
							>
								<SaveIcon />
							</button>





						</div>


						:



						<div className=''>

							<button
								className='  '
								onClick={() => handlerPositionEdit(id)}
							>
								<EditIcon />
							</button>

						</div>
					}

				</div>


			}

		</div>
	);
};

export default PalletPosition;