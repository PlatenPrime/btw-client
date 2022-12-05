import React, { useCallback, useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../../utils/axios';
import { toast } from 'react-toastify';

import { removePallet, updatePallet } from '../../redux/features/pallet/palletSlice';
import { checkIsAuth } from '../../redux/features/auth/authSlice';

import PalletItem from '../../components/Pallet/PalletItem';
import PageBTW from '../../components/UI/PageBTW';
import ControlBTW from '../../components/UI/ControlBTW';
import MainBTW from '../../components/UI/MainBTW';
import EditButton from '../../components/UI/Buttons/EditButton';
import CancelButton from '../../components/UI/Buttons/CancelButton';
import SaveButton from '../../components/UI/Buttons/SaveButton';
import DeleteButton from '../../components/UI/Buttons/DeleteButton';
import AddButton from '../../components/UI/Buttons/AddButton';








const PalletPage = () => {

	// States

	const [pallet, setPallet] = useState("")
	const [isPalletEditing, setIsPalletEditing] = useState(false)

	const [title, setTitle] = useState("")
	const [positions, setPositions] = useState("")





	// Hooking


	const { status } = useSelector((state) => state.pallet)
	const navigate = useNavigate()
	const params = useParams()
	const dispatch = useDispatch()
	const isAuth = useSelector(checkIsAuth)


	useEffect(() => {
		if (status) {
			toast(status)
		}
		if (!isAuth) navigate('/login')
	}, [status, isAuth, navigate])



	const fetchPallet = useCallback(async () => {
		const { data } = await axios.get(`/pallets/${params.id}`)
		setPallet(data)
		setTitle(data.title)
		setPositions(data.positions)

	}, [params.id])

	useEffect(() => {
		fetchPallet()
	}, [fetchPallet])



	// Pallet Handlers

	const removeAttempt = () => {
		window.confirm("Удалить эту паллету?") && dispatch(removePallet(params.id))
			&& toast('Паллета была удалена')
			&& navigate(`/rows`)
	}


	const handlerPalletRemove = () => {
		try {
			removeAttempt()

		} catch (error) {
			console.log(error)
		}
	}

	const handlerPalletEdit = () => {
		setIsPalletEditing(true);
	}

	const handlerCancelPalletEditing = () => {
		setIsPalletEditing(false);
	}


	const handlerPalletSave = () => {
		submitPalletSave();
		setIsPalletEditing(false);

	}

	const submitPalletSave = () => {
		try {
			const updatedPallet = {
				...pallet,
				title,
				positions
			}

			dispatch(updatePallet(updatedPallet))
			if (status) {
				toast(status)
			}

		} catch (error) {
			console.log(error)
		}
	}


	// Render


	return (
		<PageBTW >

			<MainBTW>

				<PalletItem
					isPalletEditing={isPalletEditing}
					title={title}
					setTitle={setTitle}
					positions={positions}
					setPositions={setPositions}


				/>


			</MainBTW>




			<ControlBTW>



				{isPalletEditing ?

					<div className=''>


						<CancelButton
							onClick={handlerCancelPalletEditing}
						>
							Отмена
						</CancelButton>


						<SaveButton
							onClick={handlerPalletSave}
						>
							Сохранить
						</SaveButton>



						<DeleteButton
							onClick={handlerPalletRemove}
						>
							Удалить паллету
						</DeleteButton>



					</div>






					:


					<EditButton
						onClick={handlerPalletEdit}
					>
						Редактировать
					</EditButton>


				}




			</ControlBTW>


		</PageBTW>
	);
};

export default PalletPage;