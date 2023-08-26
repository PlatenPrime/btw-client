import React, { useEffect, useState } from 'react'
import PageBTW from '../../components/UI/Page/PageBTW'
import MainBTW from '../../components/UI/Page/MainBTW'
import ContentMain from '../../components/UI/Page/ContentMain'
import ControlBTW from '../../components/UI/Page/Control/ControlBTW'
import InputBlock from "../../components/blocks/InputBlock"
import CardBlock from '../../components/blocks/CardBlock'
import ButtonBlock from '../../components/blocks/ButtonBlock'
import { getArtDataSharte } from '../../utils/getArtDataSharte'
import useFetchArts from '../../hooks/useFetchArts'
import HeaderBlock from '../../components/blocks/HeaderBlock'
import TextBlock from '../../components/blocks/TextBlock'
import RowBlock from '../../components/blocks/RowBlock'
import ImageBlock from '../../components/blocks/ImageBlock'







export default function ArtList() {


	const [link, setLink] = useState("")
	const [price, setPrice] = useState("")
	const [isAvailable, setIsAvailable] = useState(false)
	const [res, setRes] = useState(false)
	const [compArt, setCompArt] = useState("")
	const [compProd, setCompProd] = useState("")
	const [sharteLink, setSharteLink] = useState("")


	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();

	const photoSrc = `https://sharik.ua/images/elements_big/${compArt.trim()}_m1.jpg`;

	let artikulDB;

	if (artsDB) artikulDB = artsDB.find(item => item.artikul === compArt.trim());




	useEffect(() => {
		console.log(artsDB)
	}, [artsDB])


	const handleChange = (e) => {
		setLink(e.target.value)
		console.log(e.target.value)
	}

	const handleClick = async () => {

		setPrice("")
		setRes(false)

		const { price, isAvailable } = await getArtDataSharte(link)
		setRes(true)
		setPrice(price)
		setIsAvailable(isAvailable)

	}






	return (



		<PageBTW>

			<HeaderBlock className="bg-gradient-to-r from-violet-500 to-purple-500">

				Анализ конкурентов

			</HeaderBlock>

			<MainBTW>
				<ContentMain>

					<CardBlock className="bg-sky-400/50" >
						<h2 className='text-2xl'>Артикулы БТрейд</h2>

						{loadingArtsDB && <p>Загрузка данных...</p>}
						{artsDB && <p>Сейчас в базе данных БТрейд артикулов: <span className='text-lg bg-sky-500 p-1 rounded' >{artsDB.length} </span>  </p>}
					</CardBlock>


					<CardBlock className="flex flex-col justify-center items-center" >

						<TextBlock className="text-xl">
							Добавление артикула для отслеживания
						</TextBlock>



						<CardBlock className=' flex w-full' >

							<form className=' w-1/2 flex flex-col items-start justify-start space-y-2' >


								<RowBlock className="space-x-2" >
									<TextBlock className=' w-1/2' >
										Артикул Бтрейд:
									</TextBlock>
									<InputBlock type="text"
										className='InputBlock  '
										placeholder="Введи артикул БТрейд..."
										onChange={(e) => setCompArt(e.target.value)}

									/>

								</RowBlock>


								<RowBlock className="space-x-2" >
									<TextBlock>
										Производитель:
									</TextBlock>

									<InputBlock type="text"
										className='InputBlock'
										placeholder="Выбери производителя"
										onChange={(e) => setCompProd(e.target.value)}

									/>
								</RowBlock>



								<RowBlock className="space-x-2" >
									<TextBlock>
										Ссылка Sharte:
									</TextBlock>

									<InputBlock type="text"
										className='InputBlock'
										placeholder="Введи ссылку sharte"
										onChange={(e) => setSharteLink(e.target.value)}

									/>
								</RowBlock>

								<ButtonBlock
									className="create w-full"
									disabled={!compArt || !compProd || !sharteLink}
								>
									Добавить
								</ButtonBlock>



							</form>


							<CardBlock className="w-1/2 space-y-2" >

								<TextBlock>
									{artikulDB && <span>{artikulDB.nameukr}</span>}
								</TextBlock>


								<ImageBlock
									src={compArt.length === 9 ? photoSrc : "https://sharik.ua/local/templates/main/images/ua-logo.png"}
									alt="Если ты видишь эту надпись, значит ты ошибся с артикулом"
									width={200}
									height={200}
									className="mx-auto"

								/>
							</CardBlock>

						</CardBlock>





					</CardBlock>

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



						{!res ? "Нет информации" : isAvailable ? "Есть на остатке" : "Нет на остатке"}

						{price ? <p>{price}</p> : <p></p>}


					</CardBlock>





					<CardBlock>
						Здесь будет поиск 1 артикула и добавление его в бд
					</CardBlock>




					<CardBlock>
						Здесь будет вывод списка артикулов с БД с возможностью обновления по ним информации о наличии
					</CardBlock>


				</ContentMain>
				<ControlBTW>
					Control Panel
				</ControlBTW>
			</MainBTW>



		</PageBTW>
	)
}
