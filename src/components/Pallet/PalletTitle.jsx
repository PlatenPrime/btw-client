import React, { useEffect, useState } from 'react';
import TitleBTW from '../UI/TitleBTW';

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


		<TitleBTW>

			<div className='   '>

				{isEditingTitle ?

					<div className=''>

						<input
							className=''
							type="text"
							value={newTitle}
							placeholder='Название...'
							onChange={e => setNewTitle(e.target.value)} />


						{isPalletEditing && <button
							className=''
							onClick={handlerSaveTitle}

						>
							<SaveIcon />


						</button>}

					</div>


					:


					<div className=''>


						{title && <h2
							className=' '
						>{newTitle}</h2>}


						{title ?

							isPalletEditing && <button
								className=''
								onClick={handlerEditTitle}

							>


								<EditIcon />


							</button>

							:

							isPalletEditing && <button
								className=''
								onClick={handlerEditTitle}

							>Добавить название</button>

						}


					</div>

				}





			</div>
		</TitleBTW>
	);
};

export default PalletTitle;