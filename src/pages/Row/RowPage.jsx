import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../../utils/axios';
import { toast } from 'react-toastify';


import { createPallet, getRowPallets } from "../../redux/features/pallet/palletSlice"

import { removeRow, updateRow } from "../../redux/features//row/rowSlice";



import PageBTW from '../../components/UI/Page/PageBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import MainBTW from '../../components/UI/Page/MainBTW';



import ContentMain from '../../components/UI/Page/ContentMain';
import ButtonBlock from '../../components/blocks/ButtonBlock';
import HeaderBlock from '../../components/blocks/HeaderBlock';
import CellBlock from '../../components/blocks/CellBlock';
import RowTitle from './Row/RowTitle';
import RowPallets from './Row/RowPallets';
import RowPalletAdd from './Row/RowPalletAdd';
import TextBlock from '../../components/blocks/TextBlock';
import CardBlock from '../../components/blocks/CardBlock';





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
			&& toast.info(`Ряд ${title} был удален`)
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


		if (palletTitle) try {
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


		<PageBTW  >


			<HeaderBlock
				className="
			bg-orange-500
			bg-gradient-to-r from-orange-500 to-amber-500
			
			"

			>

				Ряд {title}

			</HeaderBlock>



			<MainBTW  >


				<ContentMain   >




					<TextBlock className="text-2xl text-white   rounded m-1 p-3 bg-amber-500" >
						Паллеты
					</TextBlock>


					{isRowEditing && <CardBlock className="p-2  " >




						<RowTitle
							isRowEditing={isRowEditing}
							title={title}
							setTitle={setTitle}
						/>




						<RowPalletAdd
							isPalletCreate={isPalletCreate}
							palletTitle={palletTitle}
							setPalletTitle={setPalletTitle}
							setIsPalletCreate={setIsPalletCreate}
							handlerCreatePallet={handlerCreatePallet}
						/>



					</CardBlock>}




					<CardBlock className="p-2  " >


						{pallets.length ?

							<RowPallets
								pallets={pallets}
							/>


							:

							<TextBlock className="text-2xl" >
								Этот ряд не содержит паллет
							</TextBlock>


}







					</CardBlock>







				</ContentMain>





				<ControlBTW >



					{isRowEditing ?

						<CellBlock className='w-full flex flex-col ' >

							<ButtonBlock
								className='cancel-c w-full'
								onClick={handlerCancelRowEditing}

							>
								Отмена
							</ButtonBlock>



							<ButtonBlock
								className=' success-c w-full'
								onClick={handlerRowSave}

							>
								Сохранить
							</ButtonBlock>




							<ButtonBlock
								className='delete-c w-full '
								onClick={handlerRowRemove}

							>
								Удалить ряд
							</ButtonBlock>



						</CellBlock>



						:



						<ButtonBlock
							className='edit-c w-full'
							onClick={handlerRowEdit}
						>
							Редактировать
						</ButtonBlock>


					}




				</ControlBTW>



			</MainBTW>







		</PageBTW>




	);
};

export default RowPage;