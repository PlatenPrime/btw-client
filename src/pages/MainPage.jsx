import React from 'react';










import PageBTW from '../components/UI/Page/PageBTW';
import MainBTW from '../components/UI/Page/MainBTW';
import ControlBTW from '../components/UI/Page/Control/ControlBTW';
import HeaderPageBTW from '../components/UI/Page/Header/HeaderMainBTW';
import TitleHeaderMain from '../components/UI/Page/Header/TitleHeaderMain';

import ContentMain from '../components/UI/Page/ContentMain';
import RowBlock from '../components/blocks/RowBlock';
import ButtonBlock from '../components/blocks/ButtonBlock';
import CardBlock from '../components/blocks/CardBlock';
import InputBlock from '../components/blocks/InputBlock';
import SpinnerBlock from '../components/blocks/SpinnerBlock';









const MainPage = () => {





	return (
		<PageBTW >

			<HeaderPageBTW>
				<TitleHeaderMain
					className='text-2xl'
				>
					Панель быстрого доступа
				</TitleHeaderMain>
			</HeaderPageBTW>



			<MainBTW>


				<ContentMain >

				<CardBlock className="h-40 bg-blue-500" >

					<SpinnerBlock  />

					</CardBlock>

					<CardBlock>
					<ButtonBlock className='edit' >Edit</ButtonBlock>
					<ButtonBlock className='create' >Create</ButtonBlock>
					<ButtonBlock className='cancel' >Cancel</ButtonBlock>
					<ButtonBlock className='success' >Success</ButtonBlock>
					<ButtonBlock className='delete' >Delete</ButtonBlock>
					<ButtonBlock className='confirm' >Confirm</ButtonBlock>
					<ButtonBlock className='add' >Add</ButtonBlock>
					</CardBlock>
					


				</ContentMain>



				<ControlBTW>
				<ButtonBlock className='edit-c w-full' >Edit-c</ButtonBlock>
					<ButtonBlock className='create-c w-full' >Create-c</ButtonBlock>
					<ButtonBlock className='cancel-c w-full' >Cancel-c</ButtonBlock>
					<ButtonBlock className='success-c w-full' >Success-c</ButtonBlock>
					<ButtonBlock className='delete-c w-full' >Delete-c</ButtonBlock>
					<ButtonBlock className='confirm-c w-full' >Confirm-c</ButtonBlock>
					<ButtonBlock className='add-c w-full' >Add-c</ButtonBlock>
				</ControlBTW>


			</MainBTW>



		</PageBTW>
	);
};

export default MainPage;