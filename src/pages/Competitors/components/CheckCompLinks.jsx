import React, { useState } from 'react'
import { getArtDataYumi } from '../../../utils/getArtDataYumi'
import { getArtDataBtrade } from '../../../utils/getArtDataBtrade'
import { getArtDataSharte } from '../../../utils/getArtDataSharte'
import { getArtDataAir } from '../../../utils/getArtDataAir'
import { getArtDataBest } from '../../../utils/getArtDataBest'
import { ButtonBlock, CardBlock, InputBlock, TextBlock, ModalWrapper } from '../../../components'


import { BsClipboardCheck } from 'react-icons/bs';




export default function CheckCompLinks() {

	const [showModalInfo, setShowModalInfo] = useState(false)

	const [artikulYumi, setArtikulYumi] = useState("")
	const [priceYumi, setPriceYumi] = useState("")
	const [quantYumi, setQuantYumi] = useState(null)

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



	const handleFetchYumi = async (artikulYumi) => {
		console.log(artikulYumi)

		const { price, quant } = await getArtDataYumi(artikulYumi)
		console.log(price)
		console.log(quant)
		setPriceYumi(price)
		setQuantYumi(quant)

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
				className="confirm-c flex"
				onClick={() => { setShowModalInfo(true) }}
			>
				<BsClipboardCheck
					className='text-2xl'
				/>
				<TextBlock>Перевірити посилання</TextBlock>
			</ButtonBlock>

			{showModalInfo && <CardBlock>
				<ModalWrapper
					onCancel={() => { setShowModalInfo(false) }}
title="Перевірка посилань"
				>


					<table>
						<tbody>

							<tr


							>
								<CardBlock className="flex border border-slate-500 items-center w-full">
									<td><TextBlock>Btrade</TextBlock></td>
									<td>
										<InputBlock
											onChange={(e) => { setArtikulBtrade(e.target.value) }}
											value={artikulBtrade}
											placeholder="Введи артикул btrade"
										/>
									</td>
									<td>
										<ButtonBlock
											className="search-c"
											onClick={() => { handleFetchBtrade(artikulBtrade) }}
											disabled={!artikulBtrade}
										>
											Проверить
										</ButtonBlock>
									</td>
									<td><TextBlock>Цена: {priceBtrade ? priceBtrade : "-"}</TextBlock></td>
									<td><TextBlock>Количество: {quantBtrade ? quantBtrade : "-"}</TextBlock></td>
								</CardBlock>
							</tr>

							<tr>

								<CardBlock className="flex border border-slate-500 items-center w-full">
									<td><TextBlock>Yumi</TextBlock></td>
									<td>
										<InputBlock
											onChange={(e) => { setArtikulYumi(e.target.value) }}
											value={artikulYumi}
											placeholder="Введи ссылку yumi"
										/>
									</td>
									<td>
										<ButtonBlock
											className="search-c"
											onClick={() => { handleFetchYumi(artikulYumi) }}
											disabled={!artikulYumi}
										>
											Проверить
										</ButtonBlock>
									</td>
									<td><TextBlock>Цена: {priceYumi ? priceYumi : "-"}</TextBlock></td>
									<td><TextBlock>Количество: {quantYumi ? quantYumi : "-"}</TextBlock></td>
								</CardBlock>

							</tr>

							<tr>
								<CardBlock className="flex border border-slate-500 items-center w-full">
									<td><TextBlock>Sharte</TextBlock></td>
									<td>
										<InputBlock
											onChange={(e) => { setArtikulSharte(e.target.value) }}
											value={artikulSharte}
											placeholder="Введи ссылку sharte"
										/>
									</td>
									<td>
										<ButtonBlock
											className="search-c"
											onClick={() => { handleFetchSharte(artikulSharte) }}
											disabled={!artikulSharte}
										>
											Проверить
										</ButtonBlock>
									</td>
									<td><TextBlock>Цена: {priceSharte ? priceSharte : "-"}</TextBlock></td>
									<td><TextBlock>Наличие: {isAvailableSharte ? "Есть" : isAvailableSharte === false ? "Нет" : "-"}</TextBlock>
									</td>
								</CardBlock>
							</tr>

							<tr>
								<CardBlock className="flex border border-slate-500 items-center w-full">
									<td><TextBlock>Air</TextBlock></td>
									<td>
										<InputBlock
											onChange={(e) => { setArtikulAir(e.target.value) }}
											value={artikulAir}
											placeholder="Введи ссылку air"
										/>
									</td>
									<td>
										<ButtonBlock
											className="search-c"
											onClick={() => { handleFetchAir(artikulAir) }}
											disabled={!artikulAir}
										>
											Проверить
										</ButtonBlock>
									</td>
									<td><TextBlock>Цена:  {priceAir ? priceAir : "-"}</TextBlock></td>
									<td><TextBlock>Наличие: {isAvailableAir ? "Есть" : isAvailableAir === false ? "Нет" : "-"}</TextBlock></td>
								</CardBlock>
							</tr>
							<tr>
								<CardBlock className="flex border border-slate-500 items-center w-full">
									<td><TextBlock>Best</TextBlock></td>
									<td>
										<InputBlock
											onChange={(e) => { setArtikulBest(e.target.value) }}
											value={artikulBest}
											placeholder="Введи ссылку best"
										/>
									</td>
									<td>
										<ButtonBlock
											className="search-c"
											onClick={() => { handleFetchBest(artikulBest) }}
											disabled={!artikulBest}
										>
											Проверить
										</ButtonBlock>
									</td>
									<td><TextBlock>Цена: {priceBest ? priceBest : "-"}</TextBlock></td>
									<td><TextBlock> Наличие:{isAvailableBest ? "Есть" : isAvailableBest === false ? "Нет" : "-"}</TextBlock></td>
								</CardBlock>
							</tr>
						</tbody>
					</table>



				</ModalWrapper>
			</CardBlock>}
		</CardBlock>
	)
}



