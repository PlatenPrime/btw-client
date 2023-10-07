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




			<CardBlock>
				<ButtonBlock
					className="add-c"
					onClick={() => { setShowModalInfo(true) }}
				>
					Анализировать ссылки конкурентов
				</ButtonBlock>

				{showModalInfo && <CardBlock>
					<ModalInfo
						onCancel={() => { setShowModalInfo(false) }}

					>
						<CardBlock
							className="flex flex-col items-center space-y-2 border border-violet-500 p-2"
						>

							<CardBlock
								className="flex space-x-2"
							>
								<InputBlock
									onChange={(e) => { setArtikul(e.target.value) }}
									value={artikul}
									placeholder="Введи ссылку yumi"
								/>
								<ButtonBlock
									className="add-c"
									onClick={() => { handleFetch(artikul) }}
								>
									Анализ
								</ButtonBlock>
								<TextBlock>{price}</TextBlock>
								<TextBlock>{quant}</TextBlock>
							</CardBlock>


							<CardBlock
								className="flex space-x-2"
							>
								<InputBlock
									onChange={(e) => { setArtikulBtrade(e.target.value) }}
									value={artikulBtrade}
									placeholder="Введи артикул btrade"
								/>
								<ButtonBlock
									className="add-c"
									onClick={() => { handleFetchBtrade(artikulBtrade) }}
								// onClick={testFetch}
								>
									Анализ
								</ButtonBlock>
								<TextBlock>{priceBtrade}</TextBlock>
								<TextBlock>{quantBtrade}</TextBlock>
							</CardBlock>


							<CardBlock
								className="flex space-x-2"

							>
								<InputBlock
									onChange={(e) => { setArtikulSharte(e.target.value) }}
									value={artikulSharte}
									placeholder="Введи ссылку sharte"
								/>
								<ButtonBlock
									className="add-c"
									onClick={() => { handleFetchSharte(artikulSharte) }}
								>
									Анализ
								</ButtonBlock>
								<TextBlock>{priceSharte}</TextBlock>
								<TextBlock>{isAvailableSharte ? "Есть" : isAvailableSharte === false ? "Нет" : ""}</TextBlock>
							</CardBlock>


							<CardBlock
								className="flex space-x-2"
							>
								<InputBlock
									onChange={(e) => { setArtikulAir(e.target.value) }}
									value={artikulAir}
									placeholder="Введи ссылку air"
								/>
								<ButtonBlock
									className="add-c"
									onClick={() => { handleFetchAir(artikulAir) }}

								>
									Анализ
								</ButtonBlock>
								<TextBlock>{priceAir}</TextBlock>
								<TextBlock>{isAvailableAir ? "Есть" : isAvailableAir === false ? "Нет" : ""}</TextBlock>
							</CardBlock>



							<CardBlock
								className="flex space-x-2"
							>
								<InputBlock
									onChange={(e) => { setArtikulBest(e.target.value) }}
									value={artikulBest}
									placeholder="Введи ссылку best"
								/>
								<ButtonBlock
									className="add-c"
									onClick={() => { handleFetchBest(artikulBest) }}

								>
									Анализ
								</ButtonBlock>
								<TextBlock>{priceBest}</TextBlock>
								<TextBlock>{isAvailableBest ? "Есть" : isAvailableBest === false ? "Нет" : ""}</TextBlock>
							</CardBlock>

						</CardBlock>


					</ModalInfo>
				</CardBlock>}
			</CardBlock>


		</PageBTW>
	);
};

export default MainPage;