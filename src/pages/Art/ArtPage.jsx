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
import TextBlock from '../../components/blocks/TextBlock';
import CellBlock from '../../components/blocks/CellBlock';





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
		<PageBTW  >



			<HeaderBlock className="bg-gradient-to-r from-rose-500 to-pink-500">

				{art.title}

			</HeaderBlock>


			<MainBTW>


				<ContentMain   >

					<CardBlock 
					className="
					flex flex-col md:flex-row justify-center items-center md:justify-evenly 
					p-2
					
					" >




						<ImageBlock
							src={photo}
							alt="Здесь должно быть изображение артикула"
							width="200px"
							height="200px"
							className='rounded  ' />


						<CellBlock className='flex flex-col h-full justify-evenly ' >


							<TextBlock className='text-xl text-white  my-2 p-4 w-full rounded border-2 border-rose-700 hover:border-rose-900 ' >{art.name}</TextBlock>

							<TextBlock className='text-2xl my-2 p-4 rounded bg-rose-500 text-white'  > Зона: {art.zone}</TextBlock>

						</CellBlock>


					</CardBlock>





					{pallets.length ?


						<CardBlock className='  text-xl p-2 ' >



							<TextBlock className='my-3 p-3 text-2xl bg-rose-500 text-gray-100 rounded'>
								ЗАПАСЫ
							</TextBlock>







							{pallets.map((pallet) => {

								const box = pallet.positions.find(item => item.art == art.title)

								return (

									<Link
										to={`/pallets/${pallet._id}`}

									>

										<RowBlock className=' 
										flex justify-center
										w-full my-1 p-3 rounded 
										transition ease-in-out duration-300
										border-2 border-rose-700 hover:border-rose-900

										bg-rose-100 
										hover:bg-rose-500 
										text-rose-900 hover:text-gray-100
									' >

											<span className=' p-1 w-5/12 flex justify-center'>{pallet.title}</span>
											<span className='p-1 w-2/12 flex justify-center'>: </span>
											<span className='  p-1 w-5/12 flex justify-center ' >{box.pieces} </span>

										</RowBlock>

									</Link>
								)
							}

							)

							}





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