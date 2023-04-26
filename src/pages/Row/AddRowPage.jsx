import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { createRow } from "../../redux/features/row/rowSlice";









import PageBTW from '../../components/UI/Page/PageBTW';
import MainBTW from '../../components/UI/Page/MainBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';


import ContentMain from '../../components/UI/Page/ContentMain';
import ButtonBlock from '../../components/blocks/ButtonBlock';
import HeaderBlock from '../../components/blocks/HeaderBlock';
import CardBlock from '../../components/blocks/CardBlock';
import RowTitle from './Row/RowTitle';




const AddRowPage = () => {

	// State


	const [isRowEditing, setIsRowEditing] = useState(true)

	const [title, setTitle] = useState('');
	const [pallets, setPallets] = useState([]);




	// Hooking

	const dispatch = useDispatch()
	const navigate = useNavigate()






	// Handlers


	const handlerSubmit = () => {
		if (!title) {
			
			toast.error("Введи название ряда")
			
		} else
			try {
				const data = {
					title, pallets
				}
				dispatch(createRow(data))
				toast.success(`Новый ряд ${title} создан`)

				navigate('/rows')

			} catch (error) {
				console.log(error)
			}
	}





	// Render




	return (

		<PageBTW>


			<HeaderBlock className='bg-gradient-to-r from-emerald-500 to-teal-500' >

				Создание ряда

			</HeaderBlock>




			<MainBTW >


				<ContentMain>


					<CardBlock>



						<RowTitle
							isRowEditing={isRowEditing}
							title={title}
							setTitle={setTitle}


						/>




					</CardBlock>




				</ContentMain>





				<ControlBTW >


					
					<ButtonBlock

						className='success-c w-full '
						onClick={handlerSubmit}
					>
						Создать
					</ButtonBlock>



				</ControlBTW>


			</MainBTW>












		</PageBTW>

	);
};

export default AddRowPage;