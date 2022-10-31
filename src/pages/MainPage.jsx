import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth } from '../redux/features/auth/authSlice';








const MainPage = () => {


	const navigate = useNavigate()
	const isAuth = useSelector(checkIsAuth)


	useEffect(() => {

		if (!isAuth) navigate('/login')
	}, [isAuth, navigate])






	return (
		<div className='max-w-[1280px] bg-pink-500 bg-opacity-80 mx-auto ' >

			<div
				className='w-full p-3 mx-auto bg-pink-500 flex justify-center  border-y-4'

			>Панель быстрого доступа</div>

			<div className='flex min-h-40 py-4'>
				<div className='w-1/2 m-4 border flex justify-center p-3 bg-green-500 text-white text-md'>
					Найти артикул
				</div>
				<div className='w-1/2 m-4 border flex justify-center p-3  bg-blue-500 text-white text-md'>
					Попросить снять
				</div>
			</div>

		</div>
	);
};

export default MainPage;