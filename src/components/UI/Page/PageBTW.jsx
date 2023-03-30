import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth } from '../../../redux/features/auth/authSlice';
import Loading from './Loading/Loading';

const PageBTW = ({ children, className }) => {

	const isAuth = useSelector(checkIsAuth)
	const navigate = useNavigate()


	const style = `
	
	PageBTW
	${className}

`






	return (

		<>





			{!isAuth &&


				<div className=' w-full flex justify-center items-center '  >

					<Loading />

				</div>

			}




			{isAuth &&

				<div className={style}>

					{children}

				</div>

			}




		</>



	);
};

export default PageBTW;