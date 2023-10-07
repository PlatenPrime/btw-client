import React, { useState } from 'react';


import { InputBlock, ButtonBlock, CardBlock, RowBlock, HeaderBlock, TextBlock, Spinner, PageBTW } from "../components/index"



import { getArtDataYumi } from '../utils/getArtDataYumi';
import { getArtDataBtrade } from '../utils/getArtDataBtrade';
import { getArtDataSharte } from '../utils/getArtDataSharte';
import { getArtDataAir } from '../utils/getArtDataAir';
import { getArtDataBest } from '../utils/getArtDataBest';
import ModalInfo from '../components/UI/Modal/ModalInfo';







const MainPage = () => {


	const [showModalInfo, setShowModalInfo] = useState(false)





	const [artikul, setArtikul] = useState("")
	const [price, setPrice] = useState("")
	const [quant, setQuant] = useState(null)

	const [artikulBtrade, setArtikulBtrade] = useState("")
	const [priceBtrade, setPriceBtrade] = useState("")
	const [quantBtrade, setQuantBtrade] = useState(null)

	const [artikulSharte, setArtikulSharte] = useState("")
	const [priceSharte, setPriceSharte] = useState("")
	const [isAvailableSharte, setIsAvailableSharte] = useState(null)


	const [artikulAir, setArtikulAir] = useState("")
	const [priceAir, setPriceAir] = useState("")
	const [isAvailableAir, setIsAvailableAir] = useState(null)


	const [artikulBest, setArtikulBest] = useState("")
	const [priceBest, setPriceBest] = useState("")
	const [isAvailableBest, setIsAvailableBest] = useState(null)



	const handleFetch = async (artikul) => {
		console.log(artikul)

		const { price, quant } = await getArtDataYumi(artikul)
		console.log(price)
		console.log(quant)
		setPrice(price)
		setQuant(quant)

	}


	const handleFetchBtrade = async (artikulBtrade) => {
		console.log(artikulBtrade)

		const { price, quant } = await getArtDataBtrade(artikulBtrade)
		console.log(price)
		console.log(quant)
		setPriceBtrade(price)
		setQuantBtrade(quant)

	}

	const handleFetchSharte = async (artikulSharte) => {
		console.log(artikulSharte)

		const { price, isAvailable } = await getArtDataSharte(artikulSharte)
		console.log(price)
		console.log(isAvailable)
		setPriceSharte(price)
		setIsAvailableSharte(isAvailable)

	}


	const handleFetchAir = async (artikulAir) => {
		console.log(artikulAir)

		const { price, isAvailable } = await getArtDataAir(artikulAir)
		console.log(price)
		console.log(isAvailable)
		setPriceAir(price)
		setIsAvailableAir(isAvailable)

	}



	const handleFetchBest = async (artikulBest) => {
		console.log(artikulBest)

		const { price, isAvailable } = await getArtDataBest(artikulBest)
		console.log(price)
		console.log(isAvailable)
		setPriceBest(price)
		setIsAvailableBest(isAvailable)

	}








	return (


		<PageBTW className="p-2 space-y-4 " >

			<HeaderBlock className='bg-blue-500/50' >

				Главная страница

			</HeaderBlock>





			<CardBlock
				className="flex flex-col"
			>



				<TextBlock className="text-6xl" >

					BTW App
				</TextBlock>
				<TextBlock className="text-lg" >

					Balloon Trade Warehouse App
				</TextBlock>

			</CardBlock>



		</PageBTW>
	);
};

export default MainPage;