import React, { useEffect, useState } from 'react';


import EditIcon from "../UI/Icons/EditIcon"
import SaveIcon from "../UI/Icons/SaveIcon"


import AddButton from '../UI/Buttons/AddButton';
import EditButton from '../UI/Buttons/EditButton';




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




		<div className='   '>

			{isEditingTitle ?

				<div className='w-full flex items-center justify-start space-x-4 h-16'>

					<span className='bg-gray-100 p-3'>Новое название паллеты: </span>

					<input
						className='inputBTW'
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />


					{isPalletEditing &&
						<button
							className=''
							onClick={handlerSaveTitle}

						>
							<SaveIcon />


						</button>}

				</div>


				:


				<div className=''>



					{title ?

						isPalletEditing &&

						<div className='flex items-center justify-start h-16 space-x-4' >

							<span className='bg-gray-100 p-3'>Название паллеты: 	<span className='text-2xl text-sky-900'>{newTitle}</span></span>

							<button onClick={handlerEditTitle}>
								<EditIcon />
							</button>




						</div>

						:

						isPalletEditing &&

						<EditButton

							onClick={handlerEditTitle}
						>
							Добавить название
						</EditButton>

					}


				</div>

			}





		</div>

	);
};

export default PalletTitle;