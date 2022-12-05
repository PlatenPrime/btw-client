import React, { useCallback, useLayoutEffect } from 'react';
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


import PageBTW from '../../components/UI/PageBTW';
import ControlBTW from '../../components/UI/ControlBTW';
import MainBTW from '../../components/UI/MainBTW';





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


	useLayoutEffect(() => {
		if (status) {
			toast(status)
		}
		if (!isAuth) navigate('/login')
	}, [status, isAuth, navigate])


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

			<MainBTW>

				<RowItem
					isRowEditing={isRowEditing}
					title={title}
					setTitle={setTitle}
					pallets={pallets}
				/>



				{isRowEditing &&

					<div>

						{
							isPalletCreate ?


								<div className=''>


									<input
										className=''
										type="text"
										value={palletTitle}
										placeholder='Название...'
										onChange={e => setPalletTitle(e.target.value)} />






									<div className=''>

										<button
											onClick={handlerCreatePallet}
											className=' '
										>
											Добавить
										</button>

										<button
											className=' '
											onClick={() => setIsPalletCreate(false)}
										>
											Отменить
										</button>

									</div>


								</div>


								:


								<button
									className=' mx-auto'
									onClick={() => setIsPalletCreate(true)}
								>
									Добавить паллету
								</button>


						}



					</div>

				}

			</MainBTW>


			<ControlBTW className=''>



				{isRowEditing ?

					<div className=''>



						<button
							className='w-full my-1 '
							onClick={handlerCancelRowEditing}

						>
							Отмена

						</button>

						<button
							className='w-full my-1 '
							onClick={handlerRowSave}

						>
							Сохранить
						</button>



						<button
							className='w-full  my-1 '
							onClick={handlerRowRemove}

						>
							Удалить ряд
						</button>



					</div>



					:



					<div className='' >

						<button
							className='  '
							onClick={handlerRowEdit}
						>Редактировать
						</button>

					</div>
				}




			</ControlBTW>


		</PageBTW>




	);
};

export default RowPage;