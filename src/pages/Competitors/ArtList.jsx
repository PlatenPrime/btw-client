import React, { useState } from 'react'
import PageBTW from '../../components/UI/Page/PageBTW'
import MainBTW from '../../components/UI/Page/MainBTW'
import ContentMain from '../../components/UI/Page/ContentMain'
import ControlBTW from '../../components/UI/Page/Control/ControlBTW'
import InputBlock from "../../components/blocks/InputBlock"
import CardBlock from '../../components/blocks/CardBlock'
import ButtonBlock from '../../components/blocks/ButtonBlock'




const linkSharte = "https://sharte.net/catalog/lateksni_povitryani_kul%60ky/krugli_bez_malyunka_/10_metalik_30_zhovtiy_gm90.html"


async function getArtDataSharte(link) {

	try {
		const searchValuePrice = "title";
		const searchValueBe = "наявності"
		const urlProxy = 'https://corsproxy.io/?';
		const superLink = `${urlProxy}${link}`


		// Получаем строку
		const response = await fetch(superLink)
		const responseString = await response.text();

		// Находим title с метаданными 
		const indexPrice = responseString.indexOf(searchValuePrice);
		console.log(indexPrice)
		const indexPrice2 = responseString.indexOf(searchValuePrice, indexPrice + searchValuePrice.length)
		console.log(indexPrice2)
		const title = responseString.slice(indexPrice, indexPrice2 + searchValuePrice.length)
		console.log(title)

		// Ищем цену
		const regex = /(\d+\.\d{2})\sгрн/;
		const match = title.match(regex);
		let price;

		if (match && match[1]) {

			price = match[1] + " грн";
			console.log("Нашли");
		} else {
			console.log("Цена не найдена");
		}
		console.log(price)

		// Ищем наличие



		const toolsLocations = responseString.indexOf("smallElementTools")

		console.log(toolsLocations)

		const searchValueBeLocation = responseString.indexOf(searchValueBe, toolsLocations)

		console.log(searchValueBeLocation)

		const letter = responseString.slice(searchValueBeLocation - 2, searchValueBeLocation - 1)
		console.log(letter)

		const is = letter === letter.toUpperCase()




		return { price, is }






	} catch (error) {
		console.error(error);
	}




}


getArtDataSharte(linkSharte)











export default function ArtList() {


	const [link, setLink] = useState("")
	const [price, setPrice] = useState("")
	const [is, setIs] = useState(false)
	const [res, setRes] = useState(false)


	const handleChange = (e) => {
		setLink(e.target.value)
		console.log(e.target.value)
	}

	const handleClick = async () => {

		setPrice("")
		setRes(false)

		const { price, is } = await getArtDataSharte(link)
		setRes(true)
		setPrice(price)
		setIs(is)

	}



	// const { price, is } = getArtDataSharte(link)


	return (



		<PageBTW>

			<MainBTW>
				<ContentMain>

					<CardBlock>
						<InputBlock type="text"
							className='InputBlock'
							placeholder="Введи ссылку sharte"
							onChange={(e) => handleChange(e)}

						/>
						<ButtonBlock
							className="confirm"
							onClick={handleClick}
						>
							Получить данные
						</ButtonBlock>



						{!res ? "Нет информации" : is ? "Есть на остатке" : "Нет на остатке"}

						{price ? <p>{price}</p> : <p></p>}


					</CardBlock>


				</ContentMain>
				<ControlBTW>
					Control
				</ControlBTW>
			</MainBTW>

	

		</PageBTW>
	)
}
