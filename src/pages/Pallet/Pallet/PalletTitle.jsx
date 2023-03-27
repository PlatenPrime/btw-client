import React, { useEffect, useState } from 'react';


import EditIcon from "../../../components/UI/Icons/EditIcon"
import SaveIcon from "../../../components/UI/Icons/SaveIcon"



import EditButton from '../../../components/UI/Buttons/EditButton';
import ButtonBlock from '../../../components/blocks/ButtonBlock';
import InputBlock from '../../../components/blocks/InputBlock';
import RowBlock from '../../../components/blocks/RowBlock';




const PalletTitle = ({ title, setTitle, isPalletEditing }) => {

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




		<RowBlock className='   '>

			{isEditingTitle ?

				<div className='w-full flex items-center justify-start space-x-4 h-16'>

					<span className='bg-gray-100 p-3'>Новое название паллеты: </span>

					<InputBlock
						className=''
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />


					{isPalletEditing &&
						<ButtonBlock
							className='confirm'
							onClick={handlerSaveTitle}

						>
							<SaveIcon />


						</ButtonBlock>}

				</div>


				:


				<div className=''>



					{title ?

						isPalletEditing &&

						<div className='flex items-center justify-center h-16 space-x-4' >

							<span className='bg-gray-100 p-3'>Название паллеты: 	<span className='text-2xl text-sky-900'>{newTitle}</span></span>

							<ButtonBlock
								className='edit'
								onClick={handlerEditTitle}>
								<EditIcon />
							</ButtonBlock>




						</div>

						:

						isPalletEditing &&

						<ButtonBlock
							className="create"
							onClick={handlerEditTitle}
						>
							Создать название
						</ButtonBlock>

					}


				</div>

			}





		</RowBlock>

	);
};

export default PalletTitle;