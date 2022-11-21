import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { createRow } from "../../redux/features/row/rowSlice";
import { checkIsAuth } from '../../redux/features/auth/authSlice';


import RowItem from '../../components/Row/RowItem';




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


	useEffect(() => {
		if (status) {
			toast(status)
		}
		if (!isAuth) navigate('/login')
	}, [status, isAuth, navigate])




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

		<div className=''>

			<h1 className=''>Введи название ряда</h1>

			<div className='' >



				<RowItem
					isRowEditing={isRowEditing}
					title={title}
					setTitle={setTitle}



				/>


				<div className=''>


					<button
						className=''
						onClick={handlerClearForm}
					>Очистить форму</button>

					<button
						className=''
						onClick={handlerSubmit}
					>Сохранить ряд в БД</button>



				</div>



			</div>



		</div>

	);
};

export default AddRowPage;