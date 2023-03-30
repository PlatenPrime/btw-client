import React from 'react';

import InputBlock from '../../../components/blocks/InputBlock';
import RowBlock from '../../../components/blocks/RowBlock';
import CellBlock from '../../../components/blocks/CellBlock';
import ButtonBlock from '../../../components/blocks/ButtonBlock';



const RowPalletAdd = ({
	isPalletCreate,
	palletTitle,
	setPalletTitle,
	setIsPalletCreate,
	handlerCreatePallet,


}) => {
	return (
		<RowBlock className='py-2' >

			{
				isPalletCreate ?


					<CellBlock className='flex justify-center w-full p-1'>


						<InputBlock
							className='mx-1'
							type="text"
							value={palletTitle}
							placeholder='Название...'
							onChange={e => setPalletTitle(e.target.value)} />


						<ButtonBlock
							className='success'
							onClick={handlerCreatePallet}

						>
							Создать
						</ButtonBlock>


						<ButtonBlock
							className='cancel'
							onClick={() => setIsPalletCreate(false)}
						>
							Не создавать
						</ButtonBlock>




					</CellBlock>


					:



					<ButtonBlock
						className='create w-full p-3 '
						onClick={() => setIsPalletCreate(true)}
					>
						Добавить паллету
					</ButtonBlock>



			}

		</RowBlock>


	);
};

export default RowPalletAdd;