import React, { useEffect, useState } from 'react';

import DeleteIcon from '../Icons/DeleteIcon';
import EditIcon from '../Icons/EditIcon';
import SaveIcon from '../Icons/SaveIcon';




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



		<div className="text-white text-lg flex border m-1 justify-between">



			{isPalletEditing && isPositionEditing ?


				<div className='w-2/3 flex p-1'>

					<input type="text"
						className='text-black rounded-md pl-1 bg-white bg-opacity-50 p-1  outline-none mx-1 w-1/2'
						value={newArt}
						onChange={(e) => setNewArt(e.target.value)}

					/>

					<input type="number"
						className='text-black rounded-md pl-1 bg-white bg-opacity-50 p-1   outline-none mx-1 w-1/2'
						value={newPieces}
						onChange={(e) => setNewPieces(e.target.value)}
					/>


				</div>

				:
				<h1
					className='m-2'
				>
					{newArt} : {newPieces}

				</h1>
			}



			{isPalletEditing &&

				<div className='w-1/3'>


					{isPositionEditing ?

						<div className='flex  justify-end p-1 '>

							<button
								className='   bg-red-600 text-white p-1 rounded-lg mr-1 '
								onClick={() => handlerPositionDelete(id)}
							>
								<DeleteIcon />
							</button>

							<button
								className='   bg-green-600 text-white p-1 rounded-lg ml-1 '
								onClick={() => handlerPositionSave(id)}
							>
								<SaveIcon />
							</button>





						</div>


						:



						<div className='flex justify-end'>

							<button
								className='text-white flex justify-end  rounded-md p-1  '
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