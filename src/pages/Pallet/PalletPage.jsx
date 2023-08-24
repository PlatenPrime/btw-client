import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../../utils/axios';
import { toast } from 'react-toastify';

import { removePallet, updatePallet } from '../../redux/features/pallet/palletSlice';
import { checkIsAuth } from '../../redux/features/auth/authSlice';





import PageBTW from '../../components/UI/Page/PageBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import MainBTW from '../../components/UI/Page/MainBTW';



import ContentMain from '../../components/UI/Page/ContentMain';
import ButtonBlock from '../../components/blocks/ButtonBlock';
import HeaderBlock from '../../components/blocks/HeaderBlock';
import CellBlock from '../../components/blocks/CellBlock';
import CardBlock from '../../components/blocks/CardBlock';
import PalletTitle from './Pallet/PalletTitle';
import PalletPositionAdd from './Pallet/PalletPositionAdd';
import PalletPositions from './Pallet/PalletPositions';








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
			&& toast.info(`Паллета ${title} была удалена`)
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
		<PageBTW
			

		>


			<HeaderBlock

				className='
			bg-gradient-to-r from-amber-500 to-yellow-500'

			>

				Паллета {title}

			</HeaderBlock>


			<MainBTW>

				<ContentMain>


					{
						isPalletEditing &&


						<CardBlock>



							<PalletTitle
								title={title}
								setTitle={setTitle}
							/>



							<PalletPositionAdd
								positions={positions}
								setPositions={setPositions}

							/>

						</CardBlock>


					}




					<PalletPositions
						isPalletEditing={isPalletEditing}
						positions={positions}
						setPositions={setPositions}
					/>






				</ContentMain>




				<ControlBTW>



					{isPalletEditing ?

						<CellBlock className='w-full flex-col'>


							<ButtonBlock
								className='cancel-c w-full'
								onClick={handlerCancelPalletEditing}
							>
								Отмена
							</ButtonBlock>


							<ButtonBlock
								className='success-c w-full'
								onClick={handlerPalletSave}
							>
								Сохранить
							</ButtonBlock>



							<ButtonBlock
								className=' delete-c w-full'
								onClick={handlerPalletRemove}
							>
								Удалить паллету
							</ButtonBlock>



						</CellBlock>



						:


						<ButtonBlock
							className=' edit-c w-full'
							onClick={handlerPalletEdit}
						>
							Редактировать
						</ButtonBlock>


					}



				</ControlBTW>



			</MainBTW>





		</PageBTW>
	);
};

export default PalletPage;