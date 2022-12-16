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




	const [arts, setArts] = useState("");

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




	/* useLayoutEffect(() => {

		if (!isAuth) navigate('/login')
	}, [isAuth, navigate]) */




	const artInput = useRef("");

	const [artItem, setArtItem] = useState('')
	const [artCardDisplay, setArtCartDisplay] = useState(false)



	const handlerArtFind = () => {

		const art = arts.find(item => item.title === artInput.current.value)



		if (art != undefined) {
			setArtItem(art)
			setArtCartDisplay(true)
		} else {
			window.alert("Такого артикула нет")
		}





	}


	const photo = `https://sharik.ua/images/elements_big/${artItem.title}_m1.jpg`;

	return (


		<PageBTW >




			<MainBTW>

				<HeaderMainBTW>
					<TitleHeaderMain>
						Поиск артикула
					</TitleHeaderMain>
				</HeaderMainBTW>






				<div className='flex flex-col items-center md:flex-row p-4 space-x-5'>

					<input className='md:w-1/2' type="text" ref={artInput} />

					<div className='md:w-1/2'>

						<SaveButton
							className='bg-blue-600 my-5 p-2 text-white rounded-sm'
							onClick={handlerArtFind}
						>
							Найти артикул
						</SaveButton>

					</div>

				</div>





				<div
					className='cursor-pointer shadow-md border-5 hover:shadow-green-300 m-2'
					onClick={() => navigate(`/arts/${artItem._id}`)}
				>




					{artItem &&

						artCardDisplay &&

						<div className='flex flex-col items-center md:flex-row'>



							<div className='md:w-1/2 flex flex-col justify-center items-center '>

								<h1 className='text-5xl' >{artItem.title}</h1>

							</div>



							<div className='md:w-1/2'>

								<CardBTW >

									<PhotoArtBTW title={artItem.title} />

									<h1>{artItem.name}</h1>

								</CardBTW >

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