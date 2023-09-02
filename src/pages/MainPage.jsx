import React from 'react';


import PageBTW from '../components/UI/Page/PageBTW';

import ButtonBlock from '../components/blocks/ButtonBlock';
import CardBlock from '../components/blocks/CardBlock';
import HeaderBlock from '../components/blocks/HeaderBlock';
import RowBlock from '../components/blocks/RowBlock';


import TextBlock from '../components/blocks/TextBlock';







const MainPage = () => {





	return (


		<PageBTW  >

			<HeaderBlock className='bg-gradient-to-r from-cyan-500 to-blue-500' >

				Главная страница

			</HeaderBlock>





			<CardBlock className=" " >



				<TextBlock className="text-6xl" >

					BTW App
				</TextBlock>
				<TextBlock className="text-lg" >

					Balloon Trade Warehouse App
				</TextBlock>



				<RowBlock className="text-3xl" >



				</RowBlock>

			</CardBlock>


			<CardBlock className="grid md:grid-cols-3" >
				<ButtonBlock className='edit'   >Edit</ButtonBlock>
				<ButtonBlock className='create' >Create</ButtonBlock>
				<ButtonBlock className='cancel' >Cancel</ButtonBlock>
				<ButtonBlock className='success' >Success</ButtonBlock>
				<ButtonBlock className='delete' >Delete</ButtonBlock>
				<ButtonBlock className='confirm' >Confirm</ButtonBlock>
				<ButtonBlock className='add' >Add</ButtonBlock>
				<ButtonBlock className='search' >Search</ButtonBlock>
			</CardBlock>


			<ButtonBlock className='edit-c w-full' >Edit-c</ButtonBlock>
			<ButtonBlock className='create-c w-full' >Create-c</ButtonBlock>
			<ButtonBlock className='cancel-c w-full' >Cancel-c</ButtonBlock>
			<ButtonBlock className='success-c w-full' >Success-c</ButtonBlock>
			<ButtonBlock className='delete-c w-full' >Delete-c</ButtonBlock>
			<ButtonBlock className='confirm-c w-full' >Confirm-c</ButtonBlock>
			<ButtonBlock className='add-c w-full' >Add-c</ButtonBlock>
			<ButtonBlock className='search-c w-full' >Search-c</ButtonBlock>









		</PageBTW>
	);
};

export default MainPage;