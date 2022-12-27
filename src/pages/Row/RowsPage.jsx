import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';


import { getAllRows } from '../../redux/features/row/rowSlice';



import RowBage from "../../components/Row/RowBage";

import PageBTW from '../../components/UI/Page/PageBTW';
import ControlBTW from '../../components/UI/Control/ControlBTW';
import MainBTW from '../../components/UI/MainBTW';

import CreateButton from '../../components/UI/Buttons/CreateButton';
import HeaderPageBTW from '../../components/UI/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Header/TitleHeaderMain';
import { checkIsAuth } from '../../redux/features/auth/authSlice';
import Loading from '../../components/UI/Loading/Loading';
import ControlMobileBTW from '../../components/UI/Control/ControlMobileBTW';




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



			<MainBTW>

				<HeaderPageBTW>
					<TitleHeaderMain>
						Ряды
					</TitleHeaderMain>
				</HeaderPageBTW>




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




			</MainBTW>


			<ControlMobileBTW>
				<Link to="new"	>
					<CreateButton >Создать новый ряд</CreateButton>
				</Link>
			</ControlMobileBTW>



			<ControlBTW>
				<Link to="new"	>
					<CreateButton >Создать новый ряд</CreateButton>
				</Link>
			</ControlBTW>

		</PageBTW >


	);
};

export default RowsPage;