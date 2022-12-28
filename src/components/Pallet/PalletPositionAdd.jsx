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
							className=''
							value={art}
							onChange={(e) => setArt(e.target.value)}
							placeholder="Артикул"

						/>

						<input type="number"
							className=''
							value={pieces}
							onChange={(e) => setPieces(e.target.value)}
							placeholder="Количество"
						/>




					</div>


					<div className='' >

						<button
							className='    '
							onClick={handlerPositionAddSave}
						>
							<SaveIcon />

						</button>


						<button
							className='  '
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
					<AddIcon />

				</AddButton>




			}


		</div>
	);
};

export default PalletPositionAdd;