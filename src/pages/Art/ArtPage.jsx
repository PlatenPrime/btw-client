import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardBTW from '../../components/UI/CardBTW';
import PhotoArtBTW from '../../components/UI/PhotoArtBTW';

import axios from "../../utils/axios"





const ArtPage = () => {

	const params = useParams()

	const [isLoading, setIsLoading] = useState("");
	const [art, setArt] = useState("")
	const [pallets, setPallets] = useState("")

	console.log(typeof pallets)

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
		<div >

			<CardBTW
			>
				<h1
					className='text-2xl '
				>Артикул {art.title}</h1>

				<h1 className='text-xl ' >{art.name}</h1>

				<PhotoArtBTW title={art.title} />

				<h1 className='text-xl'  > Зона: {art.zone}</h1>


				{pallets && <h1 className='text-xl ' >

					Артикул {art.title} находится на следующих паллетах:
					{pallets.map((pallet) => {

						const box = pallet.positions.find(item => item.art == art.title)

						return <p className='text-lg '

						>{pallet.title} : {box.pieces}</p>
					}

					)

					}

				</h1>}

			</CardBTW >






		</div>
	);
};

export default ArtPage;