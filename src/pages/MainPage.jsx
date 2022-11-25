import React, { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth } from '../redux/features/auth/authSlice';

import CardBTW from "../components/UI/CardBTW";








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

			<CardBTW>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatem laboriosam quis error commodi esse architecto voluptatibus similique suscipit vero, enim distinctio cum doloremque facilis pariatur! Neque harum aut ducimus.
			</CardBTW>


		</div>
	);
};

export default MainPage;