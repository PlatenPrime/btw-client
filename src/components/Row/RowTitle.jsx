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
			className='
			relative
		text-3xl  
		w-full  h-16
		bg-sky-500
		hover:bg-sky-400
		transition ease-out duration-300
		border-y-4
		border-y-orange-400

		'>

			{isEditingTitle

				?

				<div className='h-full flex justify-center items-center '>

					<input
						className=' outline-none text-xl bg-sky-100 rounded'
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />


					{isRowEditing &&
						<button
							className=' 
						absolute top-1 right-1 text-gray-600
						hover:text-gray-200
						transition ease-out duration-300
						'
							onClick={handlerSaveTitle}
						>
							<SaveIcon />
						</button>}

				</div>


				:


				<div className='h-full flex justify-center items-center  '>

					{title && <h2
						className='flex    '
					>{newTitle}</h2>}


					{
						title ?
							isRowEditing && <button
								className=' 
								absolute top-1 right-1 text-gray-600
								hover:text-gray-200
								transition ease-out duration-300
								'
								onClick={handlerEditTitle}
							>
								<EditIcon />
							</button>

							:

							isRowEditing && <button
								className=' text-lg flex justify-center  w-full'
								onClick={handlerEditTitle}
							>
								Добавить название
							</button>
					}

				</div>

			}





		</div>





	);
};

export default RowTitle;