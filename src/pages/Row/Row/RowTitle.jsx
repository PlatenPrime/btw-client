
import React, { useEffect, useState } from 'react';


import { BiCheck, BiSave, BiX } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";



import ButtonBlock from '../../../components/blocks/ButtonBlock';
import InputBlock from '../../../components/blocks/InputBlock';
import RowBlock from '../../../components/blocks/RowBlock';
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

	const handlerCancelEditingTitle = () => {
		setIsEditingTitle(false);


	}





	return (



		<RowBlock className='m-1 p-1 flex justify-center items-center '>

			{isEditingTitle

				?
				(

					<>



						<InputBlock
							className=' text-center text-2xl text-white'
							type="text"
							value={newTitle}
							placeholder='Название...'
							onChange={e => setNewTitle(e.target.value)} />




						<ButtonBlock
							className='confirm text-xl'
							onClick={handlerSaveTitle}
						>
							<BiCheck />

						</ButtonBlock>


						<ButtonBlock
							className='cancel text-xl'
							onClick={handlerCancelEditingTitle}
						>
							<BiX />

						</ButtonBlock>






					</>


				)


				:

				(

					<>

						{title &&

							<TextBlock className=' mx-2 text-2xl text-white '>

								{newTitle}

							</TextBlock>}




						{
							title
								?


								<ButtonBlock
									className='edit text-xl'
									onClick={handlerEditTitle}
								>
									<BiEditAlt />
								</ButtonBlock>

								:


								<ButtonBlock
									className='add flex items-center '
									onClick={handlerEditTitle}
								>
								
									Добавить название
								
								</ButtonBlock>
						}



					</>

				)
			}


		</RowBlock>









	);
};

export default RowTitle;