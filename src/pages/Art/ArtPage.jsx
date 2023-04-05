import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import ControlBTW from '../../components/UI/Page/Control/ControlBTW';


import MainBTW from '../../components/UI/Page/MainBTW';
import PageBTW from '../../components/UI/Page/PageBTW';


import axios from "../../utils/axios"
import ContentMain from '../../components/UI/Page/ContentMain';
import HeaderBlock from '../../components/blocks/HeaderBlock';
import ImageBlock from '../../components/blocks/ImageBlock';
import CardBlock from '../../components/blocks/CardBlock';
import RowBlock from '../../components/blocks/RowBlock';





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




	const photo = `https://sharik.ua/images/elements_big/${art.title}_m1.jpg`;




	return (
		<PageBTW className="bg-gradient-to-r from-rose-100 to-pink-100" >



			<HeaderBlock className="bg-gradient-to-r from-rose-500 to-pink-500">

				{art.title}

			</HeaderBlock>


			<MainBTW>


				<ContentMain>

					<CardBlock className="grid grid-cols-2 grid-rows-2 gap-4" >




						<ImageBlock
							src={photo}
							alt="Здесь должно быть изображение артикула"
							width="200px"
							height="200px"
							className='rounded col-span-2 row-span-2' />


						<h2 className='col-span-1 row-span-1   ' >{art.name}</h2>


						<h2 className=' '  > Зона: {art.zone}</h2>


					</CardBlock>





					{pallets.length ?


						<CardBlock className='  text-xl space-y-6 ' >



							<RowBlock className='my-3 p-3 text-2xl  flex justify-center'>
								ТЕКСТОВЫЙ БЛОК
								</RowBlock>


							<div className=''>




								{pallets.map((pallet) => {

									const box = pallet.positions.find(item => item.art == art.title)

									return (

										<Link
											to={`/pallets/${pallet._id}`}

										>

											<RowBlock className=' 
										flex justify-center space-x-5 
										text-lg my-1 p-3
										bg-gray-200 hover:bg-gray-600 bg-opacity-10 hover:bg-opacity-20
										rounded transition ease-in-out duration-300' >

												<span className='bg-sky-600 bg-opacity-50  p-1 w-1/3 flex justify-center'>{pallet.title}</span>
												<span className=''>: </span>
												<span className='bg-pink-400 bg-opacity-50  p-1 w-1/3 flex justify-center ' >{box.pieces} </span>

											</RowBlock>

										</Link>
									)
								}

								)

								}

							</div>



						</CardBlock>



						:



						<RowBlock className='text-xl ' >Артикула на запасах нет</RowBlock>


					}



				</ContentMain>






				<ControlBTW>

				</ControlBTW>





			</MainBTW>




		</PageBTW>
	);
};

export default ArtPage;