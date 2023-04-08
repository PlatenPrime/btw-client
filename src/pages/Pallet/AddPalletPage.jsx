import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { createPallet } from '../../redux/features/pallet/palletSlice';
import { checkIsAuth } from '../../redux/features/auth/authSlice';





import PageBTW from '../../components/UI/Page/PageBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';

import MainBTW from '../../components/UI/Page/MainBTW';

import ButtonBlock from '../../components/blocks/ButtonBlock';
import HeaderBlock from '../../components/blocks/HeaderBlock';




const AddPalletPage = () => {

	// State

	const [isPalletEditing, setIsPalletEditing] = useState(true)

	const [title, setTitle] = useState('');
	const [positions, setPositions] = useState([]);



	// Hooking

	const dispatch = useDispatch()
	const navigate = useNavigate()







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


			<HeaderBlock>
				
					Создание паллеты
				
			</HeaderBlock>

			<MainBTW>

				

			</MainBTW>





			<ControlBTW>

				<ButtonBlock
					onClick={handlerClearForm}
				>
					Очистить форму
				</ButtonBlock>


				<ButtonBlock
					onClick={handlerSubmit}
				>
					Создать
				</ButtonBlock>




			</ControlBTW>






		</PageBTW>



	);
};

export default AddPalletPage;