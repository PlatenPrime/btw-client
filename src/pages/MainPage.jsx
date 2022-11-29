import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkIsAuth } from '../redux/features/auth/authSlice';
import axios from "../utils/axios";

import CardBTW from "../components/UI/CardBTW";
import TitleBTW from '../components/UI/TitleBTW';








const MainPage = () => {

	const [artItem, setArtItem] = useState('')

	const [arts, setArts] = useState("");
	const [pallets, setPallets] = useState("");
	const [isLoading, setIsLoading] = useState("");


	const navigate = useNavigate()
	const isAuth = useSelector(checkIsAuth)


	useLayoutEffect(() => {

		if (!isAuth) navigate('/login')
	}, [isAuth, navigate])





	const handlerGetArtById = async () => {
		try {


			setIsLoading(true);
			const art = await axios.get(`arts/:id`);
			setArtItem(art)
			setIsLoading(false);

		} catch (error) {
			console.log(error)
		}
	}



	const handlerGetPalletsIncludesArt = async () => {
		try {

			const art = "XXXX-XXXX"

			setIsLoading(true);

			const pallets = await axios.get(`pallets/art`, { "art": art });

			setPallets(pallets)

			setIsLoading(false);

		} catch (error) {
			console.log(error)
		}
	}










	return (
		<div className='max-w-[1280px] mx-auto ' >

			<div
				className=''

			>Панель быстрого доступа</div>

			<CardBTW>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde voluptatem laboriosam quis error commodi esse architecto voluptatibus similique suscipit vero, enim distinctio cum doloremque facilis pariatur! Neque harum aut ducimus.
			</CardBTW>

			<TitleBTW />


			<h1>Количество загруженных артикулов с базы данных: {arts.length}</h1>


		</div>
	);
};

export default MainPage;