import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { createRow } from "../../redux/features/row/rowSlice";
import { checkIsAuth } from '../../redux/features/auth/authSlice';


import RowItem from '../../pages/Row/Row/RowItem';
import PageBTW from '../../components/UI/Page/PageBTW';
import MainBTW from '../../components/UI/Page/MainBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';


import ContentMain from '../../components/UI/Page/ContentMain';
import ButtonBlock from '../../components/blocks/ButtonBlock';
import HeaderBlock from '../../components/blocks/HeaderBlock';



const AddRowPage = () => {

	// State


	const [isRowEditing, setIsRowEditing] = useState(true)

	const [title, setTitle] = useState('');
	const [pallets, setPallets] = useState([]);




	// Hooking

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { status } = useSelector((state) => state.row)
	const isAuth = useSelector(checkIsAuth)






	// Handlers


	const handlerSubmit = () => {
		try {
			const data = {
				title, pallets
			}
			dispatch(createRow(data))
			console.log(data)
			navigate('/rows')

		} catch (error) {
			console.log(error)
		}
	}

	const handlerClearForm = () => {

		setTitle('')
	}



	// Render




	return (

		<PageBTW>


			<HeaderBlock className='bg-gradient-to-r from-emerald-500 to-teal-500' >
				
					Создание ряда
				
			</HeaderBlock>




			<MainBTW >


				<ContentMain>

					<RowItem
						isRowEditing={isRowEditing}
						title={title}
						setTitle={setTitle}

					/>


				</ContentMain>





				<ControlBTW >


					<ButtonBlock
						className='cancel-c w-full'
						onClick={handlerClearForm}
					>
						Очистить форму
					</ButtonBlock>

					<ButtonBlock
					
						className='success-c w-full '
						onClick={handlerSubmit}
					>
						Сохранить ряд в БД
					</ButtonBlock>



				</ControlBTW>


			</MainBTW>












		</PageBTW>

	);
};

export default AddRowPage;