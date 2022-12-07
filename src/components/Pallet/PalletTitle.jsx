import React, { useEffect, useState } from 'react';


import EditIcon from "./../Icons/EditIcon"
import SaveIcon from "./../Icons/SaveIcon"


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

				<div className='w-full'>

					<input
						className=''
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
						<EditButton
							className=''
							onClick={handlerEditTitle}

						>

							{newTitle}

							<EditIcon />


						</EditButton>

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