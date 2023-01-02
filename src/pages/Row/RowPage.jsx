import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../../utils/axios';
import { toast } from 'react-toastify';


import { createPallet, getRowPallets } from "../../redux/features/pallet/palletSlice"

import { removeRow, updateRow } from "../../redux/features//row/rowSlice";
import { checkIsAuth } from '../../redux/features/auth/authSlice';

import RowItem from "../../components/Row/RowItem";


import PageBTW from '../../components/UI/Page/PageBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import MainBTW from '../../components/UI/Page/MainBTW';

import HeaderMainBTW from '../../components/UI/Page/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Page/Header/TitleHeaderMain';

import ContentMain from '../../components/UI/Page/ContentMain';





const RowPage = () => {

	// States

	const [row, setRow] = useState("")
	const [isRowEditing, setIsRowEditing] = useState(false)

	const [title, setTitle] = useState("")


	const [palletTitle, setPalletTitle] = useState("")
	const [isPalletCreate, setIsPalletCreate] = useState(false)



	// Hooking


	const { status } = useSelector((state) => state.row)
	const { pallets } = useSelector((state) => state.pallet)



	const navigate = useNavigate()
	const params = useParams()
	const dispatch = useDispatch()
	const isAuth = useSelector(checkIsAuth)





	const fetchRow = useCallback(async () => {
		const { data } = await axios.get(`/rows/${params.id}`)
		setRow(data)
		setTitle(data.title)


	}, [params.id])


	const fetchPallets = useCallback(async () => {

		try {
			dispatch(getRowPallets(params.id))
		} catch (error) {
			console.log(error)
		}

	}, [params.id, dispatch])




	useEffect(() => {
		fetchRow()
	}, [fetchRow])


	useEffect(() => {
		fetchPallets()
	}, [fetchPallets])



	// Row Handlers

	const removeAttempt = () => {
		window.confirm("Удалить этот ряд?") && dispatch(removeRow(params.id))
			&& toast('Ряд был удален')
			&& navigate('/rows')
	}


	const handlerRowRemove = () => {
		try {
			removeAttempt()

		} catch (error) {
			console.log(error)
		}
	}

	const handlerRowEdit = () => {
		setIsRowEditing(true);
	}

	const handlerCancelRowEditing = () => {
		setIsRowEditing(false);
	}


	const handlerRowSave = () => {
		submitRowSave();
		setIsRowEditing(false);

	}


	const submitRowSave = () => {
		try {
			const updatedRow = {
				...row,
				title,
			}

			dispatch(updateRow(updatedRow))




			if (status) {
				toast(status)
			}

		} catch (error) {
			console.log(error)
		}
	}

	// Pallet handlers

	const handlerCreatePallet = () => {
		try {
			const rowId = params.id;
			const title = palletTitle;
			const positions = [];
			dispatch(createPallet({ rowId, title, positions }))
			setPalletTitle('')
			setIsPalletCreate(false)

		} catch (error) {
			console.log(error)
		}
	}





	// Render






	return (


		<PageBTW >


			<HeaderMainBTW>
				<TitleHeaderMain>
					Ряд {title}
				</TitleHeaderMain>
			</HeaderMainBTW>



			<MainBTW>


				<ContentMain>


					{isRowEditing &&

						<div>

							{
								isPalletCreate ?


									<div className='flex justify-center w-full '>


										<input
											className='inputBTW  m-1'
											type="text"
											value={palletTitle}
											placeholder='Название...'
											onChange={e => setPalletTitle(e.target.value)} />




										<div className='flex flex-wrap'>

											<button
												className='buttonBTW cancel m-1'

												onClick={() => setIsPalletCreate(false)}
											>
												Не создавать
											</button>

											<button
												className='buttonBTW success m-1'
												onClick={handlerCreatePallet}

											>
												Сохранить паллету
											</button>





										</div>


									</div>


									:


									<div className='flex justify-center'>
										<button
											className='buttonBTW add  '
											onClick={() => setIsPalletCreate(true)}
										>
											Добавить паллету
										</button>
									</div>


							}



						</div>

					}


					<RowItem
						isRowEditing={isRowEditing}
						title={title}
						setTitle={setTitle}
						pallets={pallets}
					/>





				</ContentMain>





				<ControlBTW >



					{isRowEditing ?

						<div >

							<button
								className='buttonBTW cancel w-full'
								onClick={handlerCancelRowEditing}

							>
								Отмена
							</button>



							<button
								className='buttonBTW success w-full'
								onClick={handlerRowSave}

							>
								Сохранить
							</button>




							<button
								className='buttonBTW delete w-full'
								onClick={handlerRowRemove}

							>
								Удалить ряд
							</button>



						</div>



						:



						<button
							className='buttonBTW edit w-full'
							onClick={handlerRowEdit}
						>
							Редактировать
						</button>


					}




				</ControlBTW>



			</MainBTW>







		</PageBTW>




	);
};

export default RowPage;