import React from 'react';
import { useState } from 'react';





import ButtonBlock from '../../../components/blocks/ButtonBlock';
import InputBlock from '../../../components/blocks/InputBlock';
import CellBlock from '../../../components/blocks/CellBlock';




import { BiPlus } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { BiX } from "react-icons/bi";





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

		<CellBlock className='flex justify-center'>



			{isPositionAdding ?

				<CellBlock className=''>




					<CellBlock
						className='flex flex-row  p-6'
					>

						<CellBlock className='flex flex-col md:flex-row  '>
							<InputBlock type="text"
								className=' '
								value={art}
								onChange={(e) => setArt(e.target.value)}
								placeholder="Артикул"
							/>
							<InputBlock type="number"
								className='   '
								value={pieces}
								onChange={(e) => setPieces(e.target.value)}
								placeholder="Количество"
							/>
						</CellBlock>

						<ButtonBlock
							className=' success text-xl '
							onClick={handlerPositionAddSave}
						>
							<BiCheck />

						</ButtonBlock>


						<ButtonBlock
							className='cancel text-xl '
							onClick={handlerPositionAddCancel}
						>
							<BiX />

						</ButtonBlock>


					</CellBlock>




				</CellBlock>




				:







				<ButtonBlock
					className='add flex text-xl items-center '

					onClick={handlerPositionAddAdd}
				>
					<BiPlus />
					Добавить позиции
					<BiPlus />

				</ButtonBlock>




			}


		</CellBlock>
	);
};

export default PalletPositionAdd;