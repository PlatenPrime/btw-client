import React, { useEffect, useState } from 'react';


import EditIcon from "../../../components/UI/Icons/EditIcon"
import SaveIcon from "../../../components/UI/Icons/SaveIcon"



import EditButton from '../../../components/UI/Buttons/EditButton';
import ButtonBlock from '../../../components/blocks/ButtonBlock';
import InputBlock from '../../../components/blocks/InputBlock';
import RowBlock from '../../../components/blocks/RowBlock';
import TextBlock from '../../../components/blocks/TextBlock';
import CellBlock from '../../../components/blocks/CellBlock';




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
						className='text-center text-2xl'
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />


					{
						<ButtonBlock
							className='confirm'
							onClick={handlerSaveTitle}

						>
							<SaveIcon />


						</ButtonBlock>}

				</CellBlock>


				:


				<CellBlock className=''>



					{title ?



						<CellBlock className='flex items-center justify-center  ' >

							<TextBlock
								className='text-2xl text-sky-900'>
								{newTitle}


							</TextBlock>

							<ButtonBlock
								className='edit'
								onClick={handlerEditTitle}>
								<EditIcon />
							</ButtonBlock>




						</CellBlock>

						:



						<ButtonBlock
							className="create"
							onClick={handlerEditTitle}
						>
							Создать название
						</ButtonBlock>

					}


				</CellBlock>

			}





		</RowBlock>

	);
};

export default PalletTitle;