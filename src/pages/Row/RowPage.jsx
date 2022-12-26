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


import PageBTW from '../../components/UI/Page/PageBTW';
import ControlBTW from '../../components/UI/ControlBTW';
import MainBTW from '../../components/UI/MainBTW';
import EditButton from '../../components/UI/Buttons/EditButton';
import CancelButton from '../../components/UI/Buttons/CancelButton';
import SaveButton from '../../components/UI/Buttons/SaveButton';
import DeleteButton from '../../components/UI/Buttons/DeleteButton';
import AddButton from '../../components/UI/Buttons/AddButton';
import HeaderMainBTW from '../../components/UI/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Header/TitleHeaderMain';





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

			<MainBTW>

				<HeaderMainBTW>
					<TitleHeaderMain>
						Ряд {title}
					</TitleHeaderMain>
				</HeaderMainBTW>

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

										<SaveButton
											onClick={handlerCreatePallet}

										>
											Сохранить паллету
										</SaveButton>

										<CancelButton

											onClick={() => setIsPalletCreate(false)}
										>
											Не создавать
										</CancelButton>

									</div>


								</div>


								:


								<AddButton
									onClick={() => setIsPalletCreate(true)}
								>
									Добавить паллету
								</AddButton>


						}



					</div>

				}

			</MainBTW>




			<ControlBTW >



				{isRowEditing ?

					<div >

						<CancelButton

							onClick={handlerCancelRowEditing}

						>
							Отмена
						</CancelButton>



						<SaveButton

							onClick={handlerRowSave}

						>
							Сохранить
						</SaveButton>




						<DeleteButton

							onClick={handlerRowRemove}

						>
							Удалить ряд
						</DeleteButton>



					</div>



					:



					<EditButton
						onClick={handlerRowEdit}
					>
						Редактировать
					</EditButton>


				}




			</ControlBTW>


		</PageBTW>




	);
};

export default RowPage;