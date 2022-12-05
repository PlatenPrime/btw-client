import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SaveButton from '../../components/UI/Buttons/SaveButton';
import CardBTW from '../../components/UI/CardBTW';
import ControlBTW from '../../components/UI/ControlBTW';
import HeaderMainBTW from '../../components/UI/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Header/TitleHeaderMain';
import MainBTW from '../../components/UI/MainBTW';
import PageBTW from '../../components/UI/PageBTW';
import PhotoArtBTW from '../../components/UI/PhotoArtBTW';
import { checkIsAuth } from '../../redux/features/auth/authSlice';
import axios from "../../utils/axios";

const ArtFindPage = () => {

	const navigate = useNavigate()
	const isAuth = useSelector(checkIsAuth)


	/* useLayoutEffect(() => {

		if (!isAuth) navigate('/login')
	}, [isAuth, navigate]) */

	const [arts, setArts] = useState("");


	const artInput = useRef("");

	const [artItem, setArtItem] = useState('')
	const [artCardDisplay, setArtCartDisplay] = useState(false)

	const photo = `https://sharik.ua/images/elements_big/${artItem.title}_m1.jpg`;



	const fetchArts = async () => {
		try {

			const { data } = await axios.get(`arts`);
			setArts(data.arts)


		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		fetchArts()
	}, [])


	useEffect(() => {
		console.log("Загружены такие артикулы: ", arts)
	}, [arts])



	const handlerArtFind = () => {

		const art = arts.find(item => item.title == artInput.current.value)

		setArtItem(art)
		setArtCartDisplay(true)

	}




	return (


		<PageBTW >




			<MainBTW>

				<HeaderMainBTW>
					<TitleHeaderMain>
						Поиск артикула
					</TitleHeaderMain>
				</HeaderMainBTW>

				<div className='flex p-4 space-x-5'>
					<input className='w-1/2' type="text" ref={artInput} />

					<div className='w-1/2'>
						<SaveButton className='bg-blue-600 m-5 p-2 text-white rounded-sm' onClick={handlerArtFind} >Найти артикул</SaveButton>
					</div>

				</div>


				<div
					className='cursor-pointer shadow-sm border-5 bg-slate-300'
					onClick={() => navigate(`/arts/${artItem._id}`)}
				>
					{artCardDisplay &&
						<div className='flex'>

							<div className='w-1/2'>
								<CardBTW >

									<PhotoArtBTW title={artItem.title} />

								</CardBTW >
							</div>



							<div className='w-1/2 flex flex-col justify-center items-center text-xl'>
								<h1>{artItem.title}</h1>
								<h1>{artItem.name}</h1>

							</div>

						</div>


					}
				</div>

			</MainBTW>

			<ControlBTW>



			</ControlBTW>


		</PageBTW >
	);
};

export default ArtFindPage;