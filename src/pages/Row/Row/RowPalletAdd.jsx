import React from 'react';

import InputBlock from '../../../components/blocks/InputBlock';
import RowBlock from '../../../components/blocks/RowBlock';
import CellBlock from '../../../components/blocks/CellBlock';
import ButtonBlock from '../../../components/blocks/ButtonBlock';





import { BiPlus } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { BiX } from "react-icons/bi";





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
							className='success text-xl'
							onClick={handlerCreatePallet}

						>
							<BiCheck />

						</ButtonBlock>


						<ButtonBlock
							className='cancel text-xl '
							onClick={() => setIsPalletCreate(false)}
						>
							<BiX />

						</ButtonBlock>




					</CellBlock>


					:



					<ButtonBlock
						className='create w-full p-3 flex items-center justify-center'
						onClick={() => setIsPalletCreate(true)}
					>
						<BiPlus />
						Добавить паллету
						<BiPlus />
					</ButtonBlock>



			}

		</RowBlock>


	);
};

export default RowPalletAdd;