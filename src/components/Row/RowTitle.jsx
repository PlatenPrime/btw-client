import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';


import EditIcon from "../UI/Icons/EditIcon"
import SaveIcon from "../UI/Icons/SaveIcon"



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



		<div className=''>

			{isEditingTitle

				?

				<div className=' h-16 flex justify-center items-center space-x-8 '>

					<span className=' text-lg '>Новое название ряда</span>

					<input
						className='text-lg '
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />

					{isRowEditing &&

						<button
							className=''
							onClick={handlerSaveTitle}
						>
							<SaveIcon />
						</button>}

				</div>

				:

				<div className='h-16 flex justify-center items-center  space-x-8 '>

					{title && isRowEditing &&
						<h2 className=' text-lg '>
							Название ряда: {newTitle}
						</h2>}


					{
						title
							?
							isRowEditing &&

							<button
								className=''
								onClick={handlerEditTitle}
							>
								<EditIcon />
							</button>

							:

							isRowEditing &&
							<button
								className=' '
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