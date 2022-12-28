import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { createPallet } from '../../redux/features/pallet/palletSlice';
import { checkIsAuth } from '../../redux/features/auth/authSlice';

import PalletItem from '../../components/Pallet/PalletItem';
import PageBTW from '../../components/UI/Page/PageBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import ControlMobileBTW from '../../components/UI/Page/Control/ControlMobileBTW';
import MainBTW from '../../components/UI/Page/MainBTW';

import CancelButton from '../../components/UI/Buttons/CancelButton';
import SaveButton from '../../components/UI/Buttons/SaveButton';
import HeaderMainBTW from '../../components/UI/Page/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Page/Header/TitleHeaderMain';




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
		<PageBTW >


			<HeaderMainBTW>
				<TitleHeaderMain>
					Создание паллеты
				</TitleHeaderMain>
			</HeaderMainBTW>

			<MainBTW>

				<PalletItem
					isPalletEditing={isPalletEditing}
					title={title}
					setTitle={setTitle}
					positions={positions}
					setPositions={setPositions}
				/>

			</MainBTW>


			<ControlMobileBTW>

				<CancelButton
					onClick={handlerClearForm}
				>
					Очистить форму
				</CancelButton>


				<SaveButton
					onClick={handlerSubmit}
				>
					Создать
				</SaveButton>

			</ControlMobileBTW>



			<ControlBTW>

				<CancelButton
					onClick={handlerClearForm}
				>
					Очистить форму
				</CancelButton>


				<SaveButton
					onClick={handlerSubmit}
				>
					Создать
				</SaveButton>




			</ControlBTW>






		</PageBTW>



	);
};

export default AddPalletPage;