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
		console.log(title)
	}





	return (

		<div className='text-lg bg-teal-300 bg-opacity-50 w-5/6 my-2 mx-auto rounded-lg'>

			{isEditingTitle ?

				<div className='flex my-1 justify-between w-full pl-1 '>

					<input
						className='text-gray-600 rounded-md pl-2 bg-opacity-80 outline-none w-4/5 my-1'
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />


					{isRowEditing && <button
						className='text-white  rounded-md p-1 mx-2 w-1/5 mx-auto'
						onClick={handlerSaveTitle}

					>
						<SaveIcon />


					</button>}

				</div>


				:


				<div className='flex my-1 w-full justify-left pl-1'>


					{title && <h2
						className='flex items-center pl-2 w-4/5 my-1 text-white '
					>{newTitle}</h2>}


					{title ?

						isRowEditing && <button
							className='text-white  rounded-md p-1 mx-2 w-1/5 mx-auto'
							onClick={handlerEditTitle}

						>


							<EditIcon />


						</button>

						:

						isRowEditing && <button
							className='text-white text-lg flex justify-center  rounded-md p-1 w-full'
							onClick={handlerEditTitle}

						>Добавить название</button>

					}


				</div>

			}





		</div>





	);
};

export default RowTitle;