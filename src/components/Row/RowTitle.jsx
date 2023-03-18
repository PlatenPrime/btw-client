import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ButtonBlock from '../blocks/ButtonBlock';
import InputBlock from '../blocks/InputBlock';


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

				<div className=' h-16  flex justify-start items-center space-x-8 '>

					<span className='p-1  bg-gray-100 text-lg '>

						<span className='mx-2'>Новое название ряда</span>

						<InputBlock
							className=' '
							type="text"
							value={newTitle}
							placeholder='Название...'
							onChange={e => setNewTitle(e.target.value)} />

					</span>





					{isRowEditing &&

						<ButtonBlock
							className=''
							onClick={handlerSaveTitle}
						>
							<SaveIcon />
						</ButtonBlock>}

				</div>

				:

				<div className='  '>

					{
						isRowEditing &&
						<div className='h-16 flex justify-start items-center  space-x-8' >

							{title && isRowEditing &&
								<h2 className=' text-lg '>


									<span className='p-3  bg-gray-100 text-lg '> Название ряда:  {newTitle}	</span>



								</h2>}


							{
								title
									?
									isRowEditing &&

									<ButtonBlock
										className=''
										onClick={handlerEditTitle}
									>
										<EditIcon /> Редактировать
									</ButtonBlock>

									:

									isRowEditing &&
									<ButtonBlock
										className=' '
										onClick={handlerEditTitle}
									>
										Добавить название
									</ButtonBlock>
							}

						</div>


					}





				</div>
			}


		</div>









	);
};

export default RowTitle;