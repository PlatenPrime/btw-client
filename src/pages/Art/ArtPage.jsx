import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CardBTW from '../../components/UI/CardBTW';
import ControlBTW from '../../components/UI/Page/Control/ControlBTW';


import MainBTW from '../../components/UI/Page/MainBTW';
import PageBTW from '../../components/UI/Page/PageBTW';
import PhotoArtBTW from '../../components/UI/PhotoArtBTW';

import axios from "../../utils/axios"
import ContentMain from '../../components/UI/Page/ContentMain';
import HeaderBlock from '../../components/blocks/HeaderBlock';





const ArtPage = () => {









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
		<PageBTW className="bg-gradient-to-r from-purple-100 to-pink-100" >



			<HeaderBlock className="bg-gradient-to-r from-purple-500 to-pink-500">

				{art.title}

			</HeaderBlock>


			<MainBTW>


				<ContentMain>

					<CardBTW>



						<h2 className='text-2xl italic bold ' >{art.name}</h2>

						<PhotoArtBTW title={art.title} />

						<h2 className='w-full p-1 flex justify-center text-white text-2xl bg-sky-700 bg-opacity-80'  > Зона: {art.zone}</h2>


						{pallets.length ?


							<div className='w-full bg-gradient-to-t from-blue-100 to-transparent text-xl space-y-6 ' >



								<div className='my-3 text-2xl w-full flex justify-center'>Запасы:</div>


								<div className=''>




									{pallets.map((pallet) => {

										const box = pallet.positions.find(item => item.art == art.title)

										return (

											<Link
												to={`/pallets/${pallet._id}`}

											>

												<div className=' 
										flex justify-center space-x-5 
										text-lg my-1 p-3
										bg-gray-200 hover:bg-gray-600 bg-opacity-10 hover:bg-opacity-20
										rounded transition ease-in-out duration-300' >

													<span className='bg-sky-600 bg-opacity-50 text-white p-1 w-1/3 flex justify-center'>{pallet.title}</span>
													<span className='text-white'>: </span>
													<span className='bg-pink-200 bg-opacity-50 text-white p-1 w-1/3 flex justify-center ' >{box.pieces} </span>

												</div>

											</Link>
										)
									}

									)

									}

								</div>



							</div>



							:



							<p className='text-xl ' >Артикула на запасах нет</p>


						}

					</CardBTW>

				</ContentMain>






				<ControlBTW>

				</ControlBTW>





			</MainBTW>




		</PageBTW>
	);
};

export default ArtPage;