import React from 'react';










import PageBTW from '../components/UI/Page/PageBTW';
import MainBTW from '../components/UI/Page/MainBTW';
import ControlBTW from '../components/UI/Page/Control/ControlBTW';


import ContentMain from '../components/UI/Page/ContentMain';
import ButtonBlock from '../components/blocks/ButtonBlock';
import CardBlock from '../components/blocks/CardBlock';
import SpinnerBlock from '../components/blocks/SpinnerBlock';
import HeaderBlock from '../components/blocks/HeaderBlock';
import RowBlock from '../components/blocks/RowBlock';


import { BiSave } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { BiEditAlt } from "react-icons/bi";
import { BiPlus } from "react-icons/bi";
import { BiCheck } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";






const MainPage = () => {





	return (
		<PageBTW  >

			<HeaderBlock className='bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-green-400  hover:to-yellow-500' >

				Панель быстрого доступа

			</HeaderBlock>



			<MainBTW>


				<ContentMain     >

					<CardBlock className=" bg-gradient-to-r from-sky-500 to-indigo-500" >

						<SpinnerBlock />

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


					<RowBlock className="text-3xl" >
						<BiEdit />
						<BiEditAlt />
						<BiPlus />
						<BiSave />
						<BiCheck />
						<BiX />
						<BiTrash />

					</RowBlock>



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