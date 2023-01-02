import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import CardBTW from '../../components/UI/CardBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';

import HeaderMainBTW from '../../components/UI/Page/Header/HeaderMainBTW';
import MainBTW from '../../components/UI/Page/MainBTW';

import TitleHeaderMain from '../../components/UI/Page/Header/TitleHeaderMain';


import PageBTW from '../../components/UI/Page/PageBTW';
import PhotoArtBTW from '../../components/UI/PhotoArtBTW';
import { checkIsAuth } from '../../redux/features/auth/authSlice';
import axios from "../../utils/axios";
import ContentMain from '../../components/UI/Page/ContentMain';

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
			console.log(artInput.current.value)
		}





	}


	const photo = `https://sharik.ua/images/elements_big/${artItem.title}_m1.jpg`;

	return (


		<PageBTW >


			<HeaderMainBTW>
				<TitleHeaderMain>
					Поиск артикула
				</TitleHeaderMain>
			</HeaderMainBTW>



			<MainBTW>



				<ContentMain>



					<div className='flex flex-col items-center  p-4 '>

						<input className=' inputBTW' type="text" ref={artInput} />


						

							<button

								className='buttonBTW confirm'
								onClick={handlerArtFind}
							>
								Найти артикул
							</button>

					

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


				</ContentMain>




				<ControlBTW>

<button
className='buttonBTW edit'
>
	EMPTY
</button>

				</ControlBTW>


			</MainBTW>









		</PageBTW >
	);
};

export default ArtFindPage;