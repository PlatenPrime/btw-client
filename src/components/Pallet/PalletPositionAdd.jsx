import React from 'react';
import { useState } from 'react';

import AddIcon from "../Icons/AddIcon";
import CancelIcon from "../Icons/CancelIcon";
import SaveIcon from "../Icons/SaveIcon";








const PalletPositionAdd = ({ positions, setPositions }) => {

	const [isPositionAdding, setIsPositionAdding] = useState(false);
	const [newPosition, setNewPosition] = useState("")
	const [art, setArt] = useState("");
	const [pieces, setPieces] = useState("");




	const addPosition = () => {

		const position = {
			id: positions.length === 0 ? 1 : positions[positions.length - 1].id + 1,
			art: art,
			pieces: pieces,
		};


		setPositions(art && pieces ? [...positions, position] : positions);
		setArt("");
		setPieces("");
		console.log(positions)

	}


	// PositionsAdd Handlers

	const handlerPositionAddSave = () => {
		addPosition()
	}

	const handlerPositionAddAdd = () => {
		setIsPositionAdding(true)
	}


	const handlerPositionAddCancel = () => {
		setIsPositionAdding(false)
	}



	return (

		<div className='w-full'>



			{isPositionAdding ?

				<div className='flex justify-between p-2 my-3'>




					<div
						className='w-2/3 flex p-1'
					>

						<input type="text"
							className='text-black rounded-md pl-1 bg-white bg-opacity-50 p-1  outline-none mx-1 w-1/2'
							value={art}
							onChange={(e) => setArt(e.target.value)}
							placeholder="Артикул"

						/>

						<input type="number"
							className='text-black rounded-md pl-1 bg-white bg-opacity-50 p-1   outline-none mx-1 w-1/2'
							value={pieces}
							onChange={(e) => setPieces(e.target.value)}
							placeholder="Количество"
						/>




					</div>


					<div className='w-1/3 flex  justify-center p-1 mx-auto' >

						<button
							className='   bg-green-600 text-white p-1 rounded-lg mr-1 '
							onClick={handlerPositionAddSave}
						>
							<SaveIcon />

						</button>


						<button
							className='   bg-white text-red-600 p-1 rounded-lg ml-1'
							onClick={handlerPositionAddCancel}
						>
							<CancelIcon />

						</button>
					</div>


				</div>




				:






				<div className='p-2 my-3 w-full flex justify-center'>
					<button
						className=' w-1/2 bg-green-600 bg-opacity-50 border text-white p-2 rounded-lg mx-auto flex justify-center '
						onClick={handlerPositionAddAdd}
					>
						<AddIcon />

					</button>
				</div>



			}


		</div>
	);
};

export default PalletPositionAdd;