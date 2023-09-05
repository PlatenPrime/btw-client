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

			<HeaderBlock className='bg-blue-500/50' >

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


			{/* <TextBlock className="text-4xl" >Icons</TextBlock>

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



			<TextBlock className="text-4xl" >Buttons</TextBlock>

			<ButtonBlock className='edit-c ' >Edit-c</ButtonBlock>
			<ButtonBlock className='create-c ' >Create-c</ButtonBlock>
			<ButtonBlock className='cancel-c ' >Cancel-c</ButtonBlock>
			<ButtonBlock className='success-c ' >Success-c</ButtonBlock>
			<ButtonBlock className='delete-c ' >Delete-c</ButtonBlock>
			<ButtonBlock className='confirm-c ' >Confirm-c</ButtonBlock>
			<ButtonBlock className='add-c ' >Add-c</ButtonBlock>
			<ButtonBlock className='search-c ' >Search-c</ButtonBlock>


 */}






		</PageBTW>
	);
};

export default MainPage;