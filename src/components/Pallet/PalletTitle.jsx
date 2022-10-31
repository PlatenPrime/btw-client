import React, { useEffect, useState } from 'react';

import EditIcon from "./../Icons/EditIcon"
import SaveIcon from "./../Icons/SaveIcon"

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
		<div className='text-3xl bg-teal-500 w-full my-4 flex '>

			{isEditingTitle ?

				<div className='flex my-1 justify-between w-full pl-1'>

					<input
						className='text-white rounded-md pl-2 bg-slate-600 bg-opacity-80 outline-none w-4/5 my-1'
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />


					{isPalletEditing && <button
						className='text-white  rounded-md p-1 mx-2 w-1/5'
						onClick={handlerSaveTitle}

					>
						<SaveIcon />


					</button>}

				</div>


				:


				<div className='flex my-1 w-full justify-left pl-1'>


					{title && <h2
						className='flex items-center pl-2 w-4/5 my-1 '
					>{newTitle}</h2>}


					{title ?

						isPalletEditing && <button
							className='text-white  rounded-md p-1 mx-2 w-1/5 mx-auto'
							onClick={handlerEditTitle}

						>


							<EditIcon />


						</button>

						:

						isPalletEditing && <button
							className='text-white text-sm flex justify-center   rounded-md p-1 w-full'
							onClick={handlerEditTitle}

						>Добавить название</button>

					}


				</div>

			}





		</div>
	);
};

export default PalletTitle;