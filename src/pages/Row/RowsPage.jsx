import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';


import { getAllRows } from '../../redux/features/row/rowSlice';
import { createRow } from "../../redux/features/row/rowSlice";



import RowBage from "../../pages/Row/Row/RowBage";

import PageBTW from '../../components/UI/Page/PageBTW';

import ButtonBlock from '../../components/blocks/ButtonBlock';
import ListBlock from '../../components/blocks/ListBlock';
import HeaderBlock from '../../components/blocks/HeaderBlock';
import CardBlock from '../../components/blocks/CardBlock';
import TextBlock from '../../components/blocks/TextBlock';
import SpinnerBlock from '../../components/blocks/SpinnerBlock';
import RowTitle from './Row/RowTitle';
import InputBlock from '../../components/blocks/InputBlock';




const RowsPage = () => {


	const [isLoading, setIsLoading] = useState(false);
	const [isRowEditing, setIsRowEditing] = useState(true);

	const [isAddingRow, setIsAddingRow] = useState(false);

	const [title, setTitle] = useState('');
	const [pallets, setPallets] = useState([]);





	const dispatch = useDispatch();
	const { rows } = useSelector((state) => state.row);


	const dispatchRows = async () => {
		try {

			setIsLoading(true)
			dispatch(getAllRows())
			setIsLoading(false)

		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		dispatchRows()
	}, [])



	const handleSubmit = () => {
		if (!title) {

			toast.error("У ряда нет названия")

		} else
			try {
				const data = {
					title, pallets
				}
				dispatch(createRow(data))
				toast.success(`Новый ряд ${title} создан`)



			} catch (error) {
				console.log(error)
			}
			finally {
				setTitle("")
				setIsAddingRow(false)
			}
	}












	return (



		<PageBTW  >


			<HeaderBlock className="bg-orange-500/50" >

				Ряды

			</HeaderBlock>



			<CardBlock className="flex flex-col items-end">



				{!isAddingRow ?
					<ButtonBlock
						onClick={() => { setIsAddingRow(true) }}
						className='create-c' >
						Создать новый ряд
					</ButtonBlock>
					:
					<ButtonBlock
						onClick={() => { setIsAddingRow(false) }}
						className='cancel-c' >
						Отменить
					</ButtonBlock>
				}
			</CardBlock>



			{isAddingRow && <CardBlock
				className='flex justify-center'
			>


				<InputBlock
					className=' text-center text-2xl text-white'
					type="text"
					value={title}
					placeholder='Название...'
					onChange={e => setTitle(e.target.value)}
				/>

				<ButtonBlock

					className='success-c '
					onClick={handleSubmit}
					disabled={!title}
				>
					Создать
				</ButtonBlock>


			</CardBlock>}




			{

				isLoading ?


					<SpinnerBlock />


					:


					<CardBlock>

						{
							!rows.length

								?

								<TextBlock className='text-xl'>
									В базе данных нет ни одного ряда.
								</TextBlock>

								:

								<ListBlock className="flex flex-col w-full" >
									{rows?.map((row, idx) => (
										<RowBage key={idx} row={row} />
									))}
								</ListBlock>
						}

					</CardBlock>


			}






		</PageBTW >



	);
};

export default RowsPage;
