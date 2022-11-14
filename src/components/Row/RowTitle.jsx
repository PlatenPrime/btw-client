import React, { useEffect, useState } from 'react';

import EditIcon from "./../Icons/EditIcon"
import SaveIcon from "./../Icons/SaveIcon"



const RowTitle = ({ title, setTitle, isRowEditing }) => {

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

		<div 
		className='text-lg  
		w-2/3  
		mx-auto 
		border border-red-600
		'>

			{isEditingTitle ?

				<div className='flex justify-between w-full  '>

					<input
						className=' outline-none  '
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />


					{isRowEditing && <button
						className=  '  '
						onClick={handlerSaveTitle}

					>
						<SaveIcon />


					</button>}

				</div>


				:


				<div className='flex w-full justify-left '>


					{title && <h2
						className='flex items-center   '
					>{newTitle}</h2>}


					{title ?

						isRowEditing && <button
							className='  '
							onClick={handlerEditTitle}

						>


							<EditIcon />


						</button>

						:

						isRowEditing && <button
							className=' text-lg flex justify-center   w-full'
							onClick={handlerEditTitle}

						>Добавить название</button>

					}


				</div>

			}





		</div>





	);
};

export default RowTitle;