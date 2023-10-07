import React, { useEffect, useState } from 'react';

import { ButtonBlock, CellBlock, InputBlock, RowBlock, TextBlock} from '../../../components';




import { BiCheck, BiSave } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";





const PalletTitle = ({ title, setTitle }) => {

	const [isEditingTitle, setIsEditingTitle] = useState(false);
	const [newTitle, setNewTitle] = useState("")



	useEffect(() => {
		setNewTitle(title)
	}, [title])



	const handlerEditTitle = () => {
		setIsEditingTitle(true);
	}


	const handlerSaveTitle = () => {
		setIsEditingTitle(false);
		setTitle(newTitle)
	}



	return (




		<RowBlock className="p-2">

			{isEditingTitle ?

				<CellBlock className='w-full flex items-center justify-center '>



					<InputBlock
						className='text-center text-white text-xl'
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />


					{
						<ButtonBlock
							className='confirm text-xl '
							onClick={handlerSaveTitle}

						>
							<BiCheck />


						</ButtonBlock>}

				</CellBlock>


				:


				<CellBlock className=''>



					{title ?



						<CellBlock className='flex items-center justify-center  ' >

							<TextBlock
								className='text-3xl text-white'>
								{newTitle}


							</TextBlock>

							<ButtonBlock
								className='edit text-xl '
								onClick={handlerEditTitle}>
								<BiEditAlt />
							</ButtonBlock>




						</CellBlock>

						:



						<ButtonBlock
							className="create text-xl"
							onClick={handlerEditTitle}
						>
							<BiPlus />
						</ButtonBlock>

					}


				</CellBlock>

			}





		</RowBlock>

	);
};

export default PalletTitle;