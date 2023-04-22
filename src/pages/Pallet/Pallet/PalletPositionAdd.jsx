import React from 'react';
import { useState } from 'react';





import ButtonBlock from '../../../components/blocks/ButtonBlock';
import InputBlock from '../../../components/blocks/InputBlock';
import CellBlock from '../../../components/blocks/CellBlock';
import RowBlock from '../../../components/blocks/RowBlock';




import { BiPlus, BiSave } from "react-icons/bi";
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

		<RowBlock className='flex justify-center'>



			{isPositionAdding ?

				




					<CellBlock
						className='flex flex-row  p-6'
					>

						<CellBlock className='flex flex-col xl:flex-row  '>
							<InputBlock type="text"
								className='m-1 text-center '
								value={art}
								onChange={(e) => setArt(e.target.value)}
								placeholder="Артикул..."
							/>
							<InputBlock type="number"
								className=' m-1 text-center '
								value={pieces}
								onChange={(e) => setPieces(e.target.value)}
								placeholder="Количество..."
							/>
						</CellBlock>

						<ButtonBlock
							className=' success text-xl '
							onClick={handlerPositionAddSave}
						>
							<BiSave />

						</ButtonBlock>


						<ButtonBlock
							className='cancel text-xl '
							onClick={handlerPositionAddCancel}
						>
							<BiX />

						</ButtonBlock>


					</CellBlock>







				:







				<ButtonBlock
					className='add flex text-xl items-center my-6 '

					onClick={handlerPositionAddAdd}
				>
					<BiPlus />
					Добавить позиции
					<BiPlus />

				</ButtonBlock>




			}


		</RowBlock>
	);
};

export default PalletPositionAdd;