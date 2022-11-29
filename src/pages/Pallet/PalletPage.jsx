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


	/* useLayoutEffect(() => {
		if (status) {
			toast(status)
		}
		if (!isAuth) navigate('/login')
	}, [status, isAuth, navigate])
 */


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
		<div className=''>



			<PalletItem
				isPalletEditing={isPalletEditing}
				title={title}
				setTitle={setTitle}
				positions={positions}
				setPositions={setPositions}


			/>







			<div className=''>



				{isPalletEditing ?

					<div className=''>


						<button
							className=''
							onClick={handlerCancelPalletEditing}

						>
							Отмена

						</button>

						<button
							className=''
							onClick={handlerPalletSave}

						>
							Сохранить

						</button>








						<button
							className='w-full text-lg font-bold  text-red-600 p-2 rounded-lg  my-1  '
							onClick={handlerPalletRemove}
						>
							Удалить паллету

						</button>



					</div>






					:

					<div className='w-full p-1' >
						<button
							className=' w-full text-xl text-white p-2 rounded-lg  my-1   bg-blue-500'
							onClick={handlerPalletEdit}
						>Редактировать</button>

					</div>
				}




			</div>


		</div>
	);
};

export default PalletPage;