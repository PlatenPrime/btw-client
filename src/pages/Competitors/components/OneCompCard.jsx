import React, { useState } from 'react'
import { ButtonBlock, CardBlock, InputBlock, RowBlock, TextBlock } from '../../../components'
import { useCompContext } from '../contexts/compContextProvider';
import { Link, useNavigate } from 'react-router-dom';











export default function OneCompCard() {

	const navigate = useNavigate()

	const { artsDB,
		loadingArtsDB,
		errorArtsDB,
		compsDB,
		loadingCompsDB,
		errorCompsDB, } = useCompContext();


	console.log(artsDB)
	console.log(compsDB)


	const [compSearch, setCompSearch] = useState("")
	const [compArt, setCompArt] = useState(null)
	const [isAddEnable, setIsAddEnable] = useState(false)


	let artikulDB;

	if (artsDB) {
		artikulDB = artsDB.find(item => item.artikul === compSearch.trim())

	};







	const handleSearch = () => {

		if (compsDB && artikulDB) {
			const comp = compsDB.find(item => item.artikul === compSearch.trim())
			if (comp) {
				setCompArt(comp)
				setIsAddEnable(false)
			}

			if (!comp) {
				setCompArt(null)
				setIsAddEnable(true)
			}
		}
	}



	return (
		<CardBlock>


			<CardBlock
				className="flex "
			>
				<InputBlock
					type="text"
					name="compSearch"
					className="text-center"
					placeholder="Введи артикул..."
					onChange={(e) => setCompSearch(e.target.value)}
					value={compSearch}


				/>




				<ButtonBlock
					onClick={handleSearch}

				>
					Поиск
				</ButtonBlock>

			</CardBlock>





			{isAddEnable &&
				<TextBlock>
					Данный артикул не анализируется. Перейди во вкладку добавление, чтобы добавить его в базу для анализа
				</TextBlock>
			}




			{compArt && <CardBlock
				className='border border-sky-600'
			>




				{compArt &&
					<section>
						<TextBlock>
							Артикул:  {compArt.artikul}
						</TextBlock>
						<TextBlock className='overflow-wrap-normal' >
							<a
								href={compArt.competitorsLinks.sharteLink}
								target='_blanked'
							>

								Ссылка Шарте
							</a>

						</TextBlock>
						<TextBlock>
							Цена БТрейд:
							{compArt.price.btrade}
						</TextBlock>
						<TextBlock>
							Цена Шарте:
							{compArt.price.sharte}
						</TextBlock>
						<TextBlock>
							Наличие Бтрейд:
							{compArt.avail.btrade}
						</TextBlock>
						<TextBlock>
							Наличие Шарте:
							{compArt.avail.sharte ? "Есть" : "Нет"}
						</TextBlock>
					</section>}


			</CardBlock>}




		</CardBlock>
	)
}
