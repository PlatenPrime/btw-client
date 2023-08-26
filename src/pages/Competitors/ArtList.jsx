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







export default function ArtList() {


	const [link, setLink] = useState("")
	const [price, setPrice] = useState("")
	const [is, setIs] = useState(false)
	const [res, setRes] = useState(false)


	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts();


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

		const { price, is } = await getArtDataSharte(link)
		setRes(true)
		setPrice(price)
		setIs(is)

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
