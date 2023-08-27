import React from 'react';










import PageBTW from '../components/UI/Page/PageBTW';
import MainBTW from '../components/UI/Page/MainBTW';
import ControlBTW from '../components/UI/Page/Control/ControlBTW';


import ContentMain from '../components/UI/Page/ContentMain';
import ButtonBlock from '../components/blocks/ButtonBlock';
import CardBlock from '../components/blocks/CardBlock';
import HeaderBlock from '../components/blocks/HeaderBlock';
import RowBlock from '../components/blocks/RowBlock';


import TextBlock from '../components/blocks/TextBlock';







const MainPage = () => {





	return (
		<PageBTW  >

			<HeaderBlock className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-green-400  hover:to-yellow-500' >

				Главная страница

			</HeaderBlock>



			<MainBTW>


				<ContentMain     >

					<CardBlock className=" " >



						<TextBlock className="text-6xl" >

							BTW App
						</TextBlock>
						<TextBlock className="text-lg" >

							Balloon Trade Warehouse App
						</TextBlock>



						<RowBlock className="text-3xl" >



						</RowBlock>


						{/* <CardBlock className="grid md:grid-cols-3" >
							<ButtonBlock className='edit text-2xl '   ><BiEditAlt /></ButtonBlock>
							<ButtonBlock className='create text-2xl' ><BiPlus /></ButtonBlock>
							<ButtonBlock className='cancel text-2xl' ><BiX /></ButtonBlock>
							<ButtonBlock className='success text-2xl' ><BiSave /></ButtonBlock>
							<ButtonBlock className='delete text-2xl' ><BiTrash /></ButtonBlock>
							<ButtonBlock className='confirm text-2xl' ><BiCheck /></ButtonBlock>
							<ButtonBlock className='add text-2xl' ><BiPlus /></ButtonBlock>
							<ButtonBlock className='search text-2xl' ><BiSearch /></ButtonBlock>
						</CardBlock> */}



					</CardBlock>


					{/* <CardBlock className="grid md:grid-cols-3" >
						<ButtonBlock className='edit'   >Edit</ButtonBlock>
						<ButtonBlock className='create' >Create</ButtonBlock>
						<ButtonBlock className='cancel' >Cancel</ButtonBlock>
						<ButtonBlock className='success' >Success</ButtonBlock>
						<ButtonBlock className='delete' >Delete</ButtonBlock>
						<ButtonBlock className='confirm' >Confirm</ButtonBlock>
						<ButtonBlock className='add' >Add</ButtonBlock>
						<ButtonBlock className='search' >Search</ButtonBlock>
					</CardBlock> */}





				</ContentMain>



				<ControlBTW  >
					<ButtonBlock className='edit-c w-full' >Edit-c</ButtonBlock>
					<ButtonBlock className='create-c w-full' >Create-c</ButtonBlock>
					<ButtonBlock className='cancel-c w-full' >Cancel-c</ButtonBlock>
					<ButtonBlock className='success-c w-full' >Success-c</ButtonBlock>
					<ButtonBlock className='delete-c w-full' >Delete-c</ButtonBlock>
					<ButtonBlock className='confirm-c w-full' >Confirm-c</ButtonBlock>
					<ButtonBlock className='add-c w-full' >Add-c</ButtonBlock>
					<ButtonBlock className='search-c w-full' >Search-c</ButtonBlock>
				</ControlBTW>






			</MainBTW>



		</PageBTW>
	);
};

export default MainPage;