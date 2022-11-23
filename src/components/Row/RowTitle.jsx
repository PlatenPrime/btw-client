import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import TitleBTW from '../UI/TitleBTW';

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

		<TitleBTW
			className='
			
		'>

			<div className=''>

				{isEditingTitle
					?
					<div className='  '>
						<input
							className=' '
							type="text"
							value={newTitle}
							placeholder='Название...'
							onChange={e => setNewTitle(e.target.value)} />
						{isRowEditing &&
							<Button
								className='
							
							'
								onClick={handlerSaveTitle}
							>
								<SaveIcon />
							</Button>}
					</div>
					:
					<div className='  '>
						{title && <h2
							className='  '
						>{newTitle}</h2>}
						{
							title ?
								isRowEditing && <Button
									className='
									
									'
									onClick={handlerEditTitle}
								>
									<EditIcon />
								</Button>
								:
								isRowEditing && <Button
									className=' '
									onClick={handlerEditTitle}
								>
									Добавить название
								</Button>
						}
					</div>
				}
			</div>



		</TitleBTW>





	);
};

export default RowTitle;