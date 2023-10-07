import React, { useState } from 'react'
import { getArtDataYumi } from '../../../utils/getArtDataYumi'
import { getArtDataBtrade } from '../../../utils/getArtDataBtrade'
import { getArtDataSharte } from '../../../utils/getArtDataSharte'
import { getArtDataAir } from '../../../utils/getArtDataAir'
import { getArtDataBest } from '../../../utils/getArtDataBest'
import { ButtonBlock, CardBlock, InputBlock, TextBlock } from '../../../components'
import ModalInfo from '../../../components/UI/Modal/ModalInfo'

export default function CheckCompLinks() {

	const [showModalInfo, setShowModalInfo] = useState(false)

	const [artikulYumi, setArtikulYumi] = useState("")
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



	const handleFetch = async (artikulYumi) => {
		console.log(artikulYumi)

		const { price, quant } = await getArtDataYumi(artikulYumi)
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

		<CardBlock>
			<ButtonBlock
				className="confirm-c"
				onClick={() => { setShowModalInfo(true) }}
			>
				Перевірити посилання
			</ButtonBlock>

			{showModalInfo && <CardBlock>
				<ModalInfo
					onCancel={() => { setShowModalInfo(false) }}

				>
					<CardBlock
						className="flex flex-col items-center space-y-2  p-4"
					>

						<CardBlock
							className="flex w-full justify-between  space-x-2"
						>
							<TextBlock>Yumi</TextBlock>
							<InputBlock
								onChange={(e) => { setArtikulYumi(e.target.value) }}
								value={artikulYumi}
								placeholder="Введи ссылку yumi"
							/>
							<ButtonBlock
								className="search-c"
								onClick={() => { handleFetch(artikulYumi) }}
								disabled={!artikulYumi}
							>
								Проверить
							</ButtonBlock>
							<TextBlock>{price}</TextBlock>
							<TextBlock>{quant}</TextBlock>
						</CardBlock>


						<CardBlock
							className="flex w-full justify-between  space-x-2"
						>
							<TextBlock>Btrade</TextBlock>
							<InputBlock
								onChange={(e) => { setArtikulBtrade(e.target.value) }}
								value={artikulBtrade}
								placeholder="Введи артикул btrade"
							/>
							<ButtonBlock
								className="search-c"
								onClick={() => { handleFetchBtrade(artikulBtrade) }}
								disabled={!artikulBtrade}
							>
								Проверить
							</ButtonBlock>
							<TextBlock>{priceBtrade}</TextBlock>
							<TextBlock>{quantBtrade}</TextBlock>
						</CardBlock>


						<CardBlock
							className="flex w-full justify-end  space-x-2"

						>
							<TextBlock>Sharte</TextBlock>
							<InputBlock
								onChange={(e) => { setArtikulSharte(e.target.value) }}
								value={artikulSharte}
								placeholder="Введи ссылку sharte"
							/>
							<ButtonBlock
								className="search-c"
								onClick={() => { handleFetchSharte(artikulSharte) }}
								disabled={!artikulSharte}
							>
								Проверить
							</ButtonBlock>
							<TextBlock>{priceSharte}</TextBlock>
							<TextBlock>{isAvailableSharte ? "Есть" : isAvailableSharte === false ? "Нет" : ""}</TextBlock>
						</CardBlock>


						<CardBlock
							className="flex justify-between  space-x-2"
						>
							<TextBlock>Air</TextBlock>
							<InputBlock
								onChange={(e) => { setArtikulAir(e.target.value) }}
								value={artikulAir}
								placeholder="Введи ссылку air"
							/>
							<ButtonBlock
								className="search-c"
								onClick={() => { handleFetchAir(artikulAir) }}
								disabled={!artikulAir}
							>
								Проверить
							</ButtonBlock>
							<TextBlock>{priceAir}</TextBlock>
							<TextBlock>{isAvailableAir ? "Есть" : isAvailableAir === false ? "Нет" : ""}</TextBlock>
						</CardBlock>



						<CardBlock
							className="flex justify-between  space-x-2"
						>
							<TextBlock>Best</TextBlock>
							<InputBlock
								onChange={(e) => { setArtikulBest(e.target.value) }}
								value={artikulBest}
								placeholder="Введи ссылку best"
							/>
							<ButtonBlock
								className="search-c"
								onClick={() => { handleFetchBest(artikulBest) }}
								disabled={!artikulBest}
							>
								Проверить
							</ButtonBlock>
							<TextBlock>{priceBest}</TextBlock>
							<TextBlock>{isAvailableBest ? "Есть" : isAvailableBest === false ? "Нет" : ""}</TextBlock>
						</CardBlock>

					</CardBlock>


				</ModalInfo>
			</CardBlock>}
		</CardBlock>
	)
}



