import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';


import { getAllRows } from '../../redux/features/row/rowSlice';



import RowBage from "../../pages/Row/Row/RowBage";

import PageBTW from '../../components/UI/Page/PageBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import MainBTW from '../../components/UI/Page/MainBTW';




import ContentMain from '../../components/UI/Page/ContentMain';
import ButtonBlock from '../../components/blocks/ButtonBlock';
import ListBlock from '../../components/blocks/ListBlock';
import HeaderBlock from '../../components/blocks/HeaderBlock';
import CardBlock from '../../components/blocks/CardBlock';
import TextBlock from '../../components/blocks/TextBlock';
import SpinnerBlock from '../../components/blocks/SpinnerBlock';




const RowsPage = () => {


	const [isLoading, setIsLoading] = useState(false);






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
	}, [rows])







	return (



		<PageBTW  >


			<HeaderBlock className="bg-orange-500" >

				Ряды

			</HeaderBlock>



			<MainBTW>





				<ContentMain  >



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





				</ContentMain>






				<ControlBTW>

					<Link to="new" className='w-full'	>

						<ButtonBlock className='create-c w-full' >
							Создать новый ряд
						</ButtonBlock>

					</Link>



				</ControlBTW>



			</MainBTW>




		</PageBTW >



	);
};

export default RowsPage;