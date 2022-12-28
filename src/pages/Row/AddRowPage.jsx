import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { createRow } from "../../redux/features/row/rowSlice";
import { checkIsAuth } from '../../redux/features/auth/authSlice';


import RowItem from '../../components/Row/RowItem';
import PageBTW from '../../components/UI/Page/PageBTW';
import MainBTW from '../../components/UI/Page/MainBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import CancelButton from '../../components/UI/Buttons/CancelButton';
import SaveButton from '../../components/UI/Buttons/SaveButton';
import HeaderMainBTW from '../../components/UI/Page/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Page/Header/TitleHeaderMain';
import ControlMobileBTW from '../../components/UI/Page/Control/ControlMobileBTW';
import ContentMain from '../../components/UI/Page/ContentMain';



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


			<HeaderMainBTW>
				<TitleHeaderMain>
					Создание ряда
				</TitleHeaderMain>
			</HeaderMainBTW>




			<MainBTW >


				<ContentMain>

					<RowItem
						isRowEditing={isRowEditing}
						title={title}
						setTitle={setTitle}

					/>


				</ContentMain>


				<ControlMobileBTW>

					<CancelButton
						onClick={handlerClearForm}
					>
						Очистить форму
					</CancelButton>

					<SaveButton
						onClick={handlerSubmit}
					>
						Сохранить ряд в БД
					</SaveButton>

				</ControlMobileBTW>


				<ControlBTW >


					<CancelButton
						onClick={handlerClearForm}
					>
						Очистить форму
					</CancelButton>

					<SaveButton
						onClick={handlerSubmit}
					>
						Сохранить ряд в БД
					</SaveButton>



				</ControlBTW>


			</MainBTW>












		</PageBTW>

	);
};

export default AddRowPage;