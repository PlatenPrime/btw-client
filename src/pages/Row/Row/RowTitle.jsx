
import React, { useEffect, useState } from 'react';
import ButtonBlock from '../../../components/blocks/ButtonBlock';
import InputBlock from '../../../components/blocks/InputBlock';
import RowBlock from '../../../components/blocks/RowBlock';
import CellBlock from '../../../components/blocks/CellBlock';
import TextBlock from '../../../components/blocks/TextBlock';



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



		<RowBlock className='m-1 p-1 flex justify-center items-center '>

			{isEditingTitle

				?


				<CellBlock>


					<TextBlock className='mx-2 text-xl text-orange-700'>Новое название ряда</TextBlock>

					<InputBlock
						className=' text-center text-xl text-orange-700'
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

				</CellBlock>




				:



				<CellBlock>

					{title &&

						<TextBlock className=' mx-2 text-xl text-orange-700 '>

							Название ряда:  {newTitle}

						</TextBlock>}




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



				</CellBlock>
			}


		</RowBlock>









	);
};

export default RowTitle;