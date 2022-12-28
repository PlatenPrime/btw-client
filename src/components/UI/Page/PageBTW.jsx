import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth } from '../../../redux/features/auth/authSlice';
import Loading from './Loading/Loading';

const PageBTW = ({ children }) => {

	const isAuth = useSelector(checkIsAuth)
	const navigate = useNavigate()




	return (

		<>





			{!isAuth &&


				<div className=' w-full flex justify-center items-center'  >

					<Loading />

				</div>

			}




			{isAuth &&

				<div className='w-full  flex flex-col items-between '>

					{children}

				</div>

			}




		</>



	);
};

export default PageBTW;