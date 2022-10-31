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


	useEffect(() => {
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


		<div className='mx-auto w-4/5  shadow-lg shadow-slate-400 rounded-b-md'>



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


							<div className='w-5/6 flex mx-auto flex-col items-center'>


								<input
									className='text-white rounded-md pl-2 py-3 bg-slate-600 bg-opacity-80 outline-none w-5/6 my-3 flex justify-center'
									type="text"
									value={palletTitle}
									placeholder='Название...'
									onChange={e => setPalletTitle(e.target.value)} />






								<div className='flex justify-between w-5/6'>
									<button
										onClick={handlerCreatePallet}
										className=' flex justify-center text-md text-white p-1 rounded-lg  my-1  bg-green-600'
									>
										Добавить
									</button>
									<button
										className=' flex justify-center text-md text-red-600 p-1 rounded-lg  my-1  bg-white'
										onClick={() => setIsPalletCreate(false)}
									>Отменить</button>
								</div>


							</div>
							:
							<button
								className=' flex justify-center text-lg text-white p-1 rounded-lg  my-1 mx-auto  bg-orange-400'
								onClick={() => setIsPalletCreate(true)}
							>Добавить паллету</button>


					}



				</div>

			}




			<div className='flex justify-center  w-full mt-10  my-3'>



				{isRowEditing ?

					<div className='p-1'>



						<button
							className='w-full text-lg text-white p-2 rounded-lg  my-1  bg-red-600'
							onClick={handlerCancelRowEditing}

						>
							Отмена

						</button>

						<button
							className='w-full text-lg text-white p-2 rounded-lg   my-1  bg-green-600'
							onClick={handlerRowSave}

						>
							Сохранить

						</button>








						<button
							className='w-full text-lg font-bold  text-red-600 p-2 rounded-lg  my-1 border '
							onClick={handlerRowRemove}
						>
							Удалить ряд

						</button>



					</div>






					:

					<div className='w-full p-1' >
						<button
							className=' w-full text-xl text-white p-2 rounded-lg  my-1   bg-blue-500'
							onClick={handlerRowEdit}
						>Редактировать</button>

					</div>
				}




			</div>


		</div>




	);
};

export default RowPage;