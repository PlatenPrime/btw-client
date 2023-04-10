
import React, { useEffect, useState } from 'react';


import { BiSave } from "react-icons/bi";
import { BiEditAlt} from "react-icons/bi";
import { BiPlus} from "react-icons/bi";



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





	return (



		<RowBlock className='m-1 p-1 flex justify-center items-center '>

			{isEditingTitle

				?
(

				<>

					

					<InputBlock
						className=' text-center text-2xl text-orange-700'
						type="text"
						value={newTitle}
						placeholder='Название...'
						onChange={e => setNewTitle(e.target.value)} />




					<ButtonBlock
						className='confirm text-xl'
						onClick={handlerSaveTitle}
					>
						<BiSave/>

					</ButtonBlock>


					</>
			

)


				:

(

				<>

					{title &&

						<TextBlock className=' mx-2 text-2xl text-orange-700 '>

							 {newTitle}

						</TextBlock>}




					{
						title
							?


							<ButtonBlock
								className='edit text-xl'
								onClick={handlerEditTitle}
							>
								<BiEditAlt/>
							</ButtonBlock>

							:


							<ButtonBlock
								className='add flex items-center '
								onClick={handlerEditTitle}
							>
								<BiPlus/>
								Добавить название
								<BiPlus/>
							</ButtonBlock>
					}



				</>

)
			}


		</RowBlock>









	);
};

export default RowTitle;