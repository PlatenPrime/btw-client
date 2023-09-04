import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { createRow } from "../../redux/features/row/rowSlice";









import PageBTW from '../../components/UI/Page/PageBTW';

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

			toast.error("У ряда нет названия")

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


			<HeaderBlock className='bg-orange-500/50' >

				Создание ряда

			</HeaderBlock>


			<CardBlock >



				<ButtonBlock

					className='success-c w-full '
					onClick={handlerSubmit}
				>
					Создать
				</ButtonBlock>



			</CardBlock>




			<CardBlock>



				<RowTitle
					isRowEditing={isRowEditing}
					title={title}
					setTitle={setTitle}


				/>


			</CardBlock>



		</PageBTW>

	);
};

export default AddRowPage;