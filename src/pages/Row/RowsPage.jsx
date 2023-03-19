import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';


import { getAllRows } from '../../redux/features/row/rowSlice';



import RowBage from "../../components/Row/RowBage";

import PageBTW from '../../components/UI/Page/PageBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import MainBTW from '../../components/UI/Page/MainBTW';


import HeaderMainBTW from '../../components/UI/Page/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Page/Header/TitleHeaderMain';

import Loading from '../../components/UI/Page/Loading/Loading';

import ContentMain from '../../components/UI/Page/ContentMain';
import ButtonBlock from '../../components/blocks/ButtonBlock';




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
	}, [dispatchRows])







	return (



		<PageBTW  >


			<HeaderMainBTW>
				<TitleHeaderMain>
					Ряды
				</TitleHeaderMain>
			</HeaderMainBTW>



			<MainBTW>


				<ContentMain>

					{isLoading ? <Loading /> : <div>

						{
							!rows.length ?
								<div className=''>
									В базе данных нет ни одного ряда.
								</div>
								:
								<div className=' space-y-4 w-full my-2'>
									{rows?.map((row, idx) => (
										<RowBage key={idx} row={row} />
									))}
								</div>
						}

					</div>}

				</ContentMain>






				<ControlBTW>
					<Link to="new"	>
						<ButtonBlock className='add' >Создать новый ряд</ButtonBlock>
					</Link>
				</ControlBTW>



			</MainBTW>




		</PageBTW >



	);
};

export default RowsPage;