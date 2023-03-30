
import React, { useEffect, useState } from 'react';
import ButtonBlock from '../../../components/blocks/ButtonBlock';
import InputBlock from '../../../components/blocks/InputBlock';
import RowBlock from '../../../components/blocks/RowBlock';



const RowTitle = ({ title, setTitle }) => {

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



		<RowBlock className='m-1 h-16 flex justify-center items-center '>

			{isEditingTitle

				?


				<>


					<span className='mx-2'>Новое название ряда</span>

					<InputBlock
						className=' '
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />




					<ButtonBlock
						className='confirm'
						onClick={handlerSaveTitle}
					>
						Сохранить

					</ButtonBlock>

				</>




				:



				<>

					{title &&

						<h2 className=' text-lg '>

							Название ряда:  {newTitle}

						</h2>}




					{
						title
							?


							<ButtonBlock
								className='edit'
								onClick={handlerEditTitle}
							>
								Редактировать
							</ButtonBlock>

							:


							<ButtonBlock
								className='add '
								onClick={handlerEditTitle}
							>
								Добавить название
							</ButtonBlock>
					}



				</>
			}


		</RowBlock>









	);
};

export default RowTitle;