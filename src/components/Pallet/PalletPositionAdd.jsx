import React from 'react';
import { useState } from 'react';

import AddIcon from "../UI/Icons/AddIcon";
import CancelIcon from "../UI/Icons/CancelIcon";
import SaveIcon from "../UI/Icons/SaveIcon";


import AddButton from "../UI/Buttons/AddButton";







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

		<div className=''>



			{isPositionAdding ?

				<div className=''>




					<div
						className=''
					>

						<input type="text"
							className='inputBTW block mx-auto m-1'
							value={art}
							onChange={(e) => setArt(e.target.value)}
							placeholder="Артикул"

						/>

						<input type="number"
							className='inputBTW block mx-auto m-1'
							value={pieces}
							onChange={(e) => setPieces(e.target.value)}
							placeholder="Количество"
						/>




					</div>


					<div className='w-full flex justify-center space-x-4 mx-auto m-1' >

						<button
							className=' w-1/2   '
							onClick={handlerPositionAddSave}
						>
							<SaveIcon />

						</button>


						<button
							className=' w-1/2  '
							onClick={handlerPositionAddCancel}
						>
							<CancelIcon />

						</button>
					</div>


				</div>




				:







				<AddButton

					onClick={handlerPositionAddAdd}
				>
					Добавить позиции

				</AddButton>




			}


		</div>
	);
};

export default PalletPositionAdd;