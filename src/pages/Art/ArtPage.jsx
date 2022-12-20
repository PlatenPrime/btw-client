import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CardBTW from '../../components/UI/CardBTW';
import ControlBTW from '../../components/UI/ControlBTW';
import HeaderMainBTW from '../../components/UI/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Header/TitleHeaderMain';
import MainBTW from '../../components/UI/MainBTW';
import PageBTW from '../../components/UI/PageBTW';
import PhotoArtBTW from '../../components/UI/PhotoArtBTW';
import { checkIsAuth } from '../../redux/features/auth/authSlice';

import axios from "../../utils/axios"





const ArtPage = () => {



	const isAuth = useSelector(checkIsAuth)
	const navigate = useNavigate()


	useEffect(() => {

		if (!isAuth) navigate('/login')

	}, [isAuth, navigate])




	const params = useParams()

	const [isLoading, setIsLoading] = useState("");
	const [art, setArt] = useState("")
	const [pallets, setPallets] = useState([])



	useEffect(() => {
		console.log("Загружен такой артикул: ", art)
	}, [art])




	const fetchArt = async () => {
		try {

			setIsLoading(true);
			const { data } = await axios.get(`arts/${params.id}`);

			setArt(data)
			setIsLoading(false);


		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		fetchArt()
	}, [params.id])


	const fetchPallets = async () => {
		try {

			setIsLoading(true);
			const { data } = await axios.get(`pallets/art/${params.id}`);
			console.log("Артикул на таких паллетах: ", data)
			setPallets(data)
			setIsLoading(false);


		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		fetchPallets()
	}, [params.id])









	return (
		<PageBTW >


			<MainBTW>

				<HeaderMainBTW>
					<TitleHeaderMain>
						{art.title}
					</TitleHeaderMain>
				</HeaderMainBTW>


				<CardBTW>



					<h1 className='text-xl ' >{art.name}</h1>

					<PhotoArtBTW title={art.title} />

					<h1 className='text-xl'  > Зона: {art.zone}</h1>


					{pallets.length ? <h1 className='text-xl ' >



						Артикул {art.title} находится на следующих паллетах:

						{pallets.map((pallet) => {

							const box = pallet.positions.find(item => item.art == art.title)

							return (
								<Link
									to={`/pallets/${pallet._id}`}

								>

									<p className='text-lg my-1 p-1
									bg-amber-100 hover:bg-amber-500
									rounded transition ease-in-out duration-300' >
										{pallet.title} : {box.pieces} шт
									</p>

								</Link>
							)
						}

						)

						}

					</h1>
						:
						<p className='text-xl ' >Артикула на запасах нет</p>


					}

				</CardBTW>

			</MainBTW>


			<ControlBTW>

			</ControlBTW>

		</PageBTW>
	);
};

export default ArtPage;