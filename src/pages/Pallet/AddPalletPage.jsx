import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { createPallet } from '../../redux/features/pallet/palletSlice';
import { checkIsAuth } from '../../redux/features/auth/authSlice';

import PalletItem from '../../components/Pallet/PalletItem';



const AddPalletPage = () => {

	// State

	const [isPalletEditing, setIsPalletEditing] = useState(true)

	const [title, setTitle] = useState('');
	const [positions, setPositions] = useState([]);



	// Hooking

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { status } = useSelector((state) => state.pallet)
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
				title, positions
			}
			dispatch(createPallet(data))
			navigate('/pallets')

		} catch (error) {
			console.log(error)
		}
	}

	const handlerClearForm = () => {
		setPositions([])
		setTitle('')
	}





	// Render


	return (
		<div className=''>

			<h1 className=''>Введи название паллеты  и позиции на ней </h1>

			<div className='' >



				<PalletItem
					isPalletEditing={isPalletEditing}
					title={title}
					setTitle={setTitle}
					positions={positions}
					setPositions={setPositions}


				/>


				<div className=''>

					<button
						className=''
						onClick={handlerSubmit}
					>Сохранить паллету в базу данных</button>


					<button
						className=''
						onClick={handlerClearForm}
					>Очистить форму</button>

				</div>



			</div>



		</div>



	);
};

export default AddPalletPage;