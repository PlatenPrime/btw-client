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
import { toast } from 'react-toastify'
import axios from '../../utils/axios'


const prods = [
	'Gemar',
	'Belbal',
	'Flex',
	"Anagram",
	"Qualatex"
	// ... добавьте остальные производители
];





export default function ArtList() {


	const [link, setLink] = useState("")
	const [price, setPrice] = useState("")
	const [isAvailable, setIsAvailable] = useState(false)
	const [res, setRes] = useState(false)
	const [compArt, setCompArt] = useState("")
	const [sharteLink, setSharteLink] = useState("")
	const [selectedProd, setSelectedProd] = useState('');
	const [isCreatingComp, setIsCreatingComp] = useState(false)


	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();


	useEffect(() => {
		if (errorArtsDB) {
			toast.error("Ошибка загрузки артикулов с БД")
		}
	}, [errorArtsDB])







	const photoSrc = `https://sharik.ua/images/elements_big/${compArt.trim()}_m1.jpg`;

	let artikulDB;

	if (artsDB) artikulDB = artsDB.find(item => item.artikul === compArt.trim());









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




	const handleSubmitAddComp = async (e) => {
		e.preventDefault();
		const newComp = {
			artikul: compArt,
			prod: selectedProd,
			competitorsLinks: {
				sharteLink
			}
		}

		try {
			setIsCreatingComp(true)
			const createCompRes = await axios.post("comps", newComp);
			console.log(createCompRes.json());
		} catch (error) {
			setIsCreatingComp(false)
		} finally {
			setIsCreatingComp(false)
			setCompArt("");
			setSharteLink("");
			setSelectedProd("");
			
		}


	}



	return (



		<PageBTW>

			<HeaderBlock className="bg-gradient-to-r from-violet-500 to-purple-500">

				Анализ конкурентов

			</HeaderBlock>

			<MainBTW>


				<ContentMain>

					{/* Хедер Загрузки артикулов */}

					<CardBlock className="bg-sky-400/50" >
						<h2 className='text-2xl'>Артикулы БТрейд</h2>

						{loadingArtsDB && <p>Загрузка данных...</p>}
						{artsDB && <p>Сейчас в базе данных БТрейд артикулов: <span className='text-lg bg-sky-500 p-1 rounded' >{artsDB.length} </span>  </p>}
					</CardBlock>





					{/* Блок добавления артикула для отслеживания */}

					<CardBlock className="flex flex-col justify-center items-center" >

						<TextBlock className="text-xl">
							Добавление артикула для отслеживания
						</TextBlock>




						<CardBlock className='  flex flex-col justify-between lg:flex-row w-full' >

							<form
								className='  flex flex-col items-start justify-start space-y-2'
								onSubmit={handleSubmitAddComp}
							>

								<RowBlock className="space-x-2" >
									<TextBlock className=' w-1/2' >
										Артикул Бтрейд:
									</TextBlock>
									<InputBlock type="text"
										className='InputBlock  '
										placeholder="Введи артикул БТрейд..."
										onChange={(e) => setCompArt(e.target.value)}
										value={compArt}

									/>

								</RowBlock>

								<RowBlock className="space-x-2" >
									<TextBlock>
										Производитель:
									</TextBlock>
									<select
										className='InputBlock focus:bg-sky-900'
										value={selectedProd}
										onChange={(e) => setSelectedProd(e.target.value)}
									>
										<option value="">Выбери производителя</option>
										{prods.map((prod, index) => (
											<option key={index} value={prod}>
												{prod}
											</option>
										))}
									</select>
								</RowBlock>

								<RowBlock className="space-x-2" >
									<TextBlock>
										Ссылка Sharte:
									</TextBlock>

									<InputBlock type="text"
										className='InputBlock'
										placeholder="Введи ссылку sharte"
										onChange={(e) => setSharteLink(e.target.value)}
										value={sharteLink}

									/>
								</RowBlock>

								<ButtonBlock
									className="create"
									disabled={!compArt || !selectedProd || !sharteLink}
									onClick={handleSubmitAddComp}
								>
									Добавить
								</ButtonBlock>

								{isCreatingComp && <TextBlock>
									Создание артикула конкурента в базе данных...
								</TextBlock>
								}


							</form>




							<CardBlock className=" space-y-2" >

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
