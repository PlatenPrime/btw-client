import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth } from '../redux/features/auth/authSlice';








const MainPage = () => {


	const navigate = useNavigate()
	const isAuth = useSelector(checkIsAuth)


	useLayoutEffect(() => {

		if (!isAuth) navigate('/login')
	}, [isAuth, navigate])






	return (
		<div className='max-w-[1280px] mx-auto ' >

			<div
				className=''

			>Панель быстрого доступа</div>

		
		</div>
	);
};

export default MainPage;