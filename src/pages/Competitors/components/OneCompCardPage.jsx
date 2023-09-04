import React, { useState } from 'react'
import { ButtonBlock, CardBlock, ImageBlock, InputBlock, RowBlock, TextBlock } from '../../../components'
import { useCompContext } from '../contexts/compContextProvider';
import { Link, useNavigate } from 'react-router-dom';


import axios from "../../../utils/axios"



const prods = [
	'Gemar',
	'Belbal',
	'Flex',
	"Anagram",
	"Qualatex"

];








export default function OneCompCardPage() {









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



	const [isEditing, setIsEditing] = useState(false)

	const [prod, setProd] = useState("");
	const [sharteLink, setSharteLink] = useState("")


	let artikulDB;

	if (artsDB) {
		artikulDB = artsDB.find(item => item.artikul === compSearch.trim())

	};


	const photoSrc = `https://sharik.ua/images/elements_big/${compSearch.trim()}_m1.jpg`;




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

	const handleDelete = async () => {


		try {

			const res = await axios.delete(`comps/${compArt._id}`)
			console.log(res)
		} catch (error) {
			console.log(error)
		}
	}


	const handleUpdate = async () => {

		console.log("handle update")

		try {


			const artikul = compArt.artikul


			const update = {
				artikul,
				prod,
				competitorsLinks: {
					...compArt.competitorsLinks, sharteLink
				}
			}


			const res = await axios.post('comps/update', update);

			console.log(res.data)


		} catch (error) {

			console.error(error);

		} finally {
			setIsEditing(false)
		}
	}



	return (
		<CardBlock
			className="flex flex-col items-center justify-start space-y-2"
		>


			<CardBlock
				className="flex p-4 "
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
					className="search-c"

				>
					Поиск в АБД
				</ButtonBlock>

			</CardBlock>






			<CardBlock
				className='flex flex-col items-center md:items-stretch md:flex-row w-full p-2'
			>




				<CardBlock className="
				p-4 w-full md:w-1/2 flex flex-col space-y-2 
				bg-white
				" >

					<TextBlock className='text-lg text-center' >
						{artikulDB ?
							<span
								className='bg-violet-600 p-2 rounded-lg '
							>{artikulDB.nameukr}</span>
							:
							<span
								className='bg-slate-600 p-2 rounded-lg'
							>Название</span>}
					</TextBlock>


					<ImageBlock
						src={artikulDB ? photoSrc : "https://sharik.ua/images/elements_big/1102-3092_m1.jpg"}
						alt="Если ты видишь эту надпись, значит ты ошибся с артикулом"
						width={200}
						height={200}
						className="mx-auto rounded-2xl shadow-md shadow-white"

					/>
				</CardBlock>





				<CardBlock
					className='flex justify-center  border border-sky-600 w-full  md:w-1/2 '

				>


					{isAddEnable &&
						<TextBlock
							className="bg-rose-400/10 text-2xl p-4"
						>
							Данный артикул не анализируется. Перейди во вкладку "Добавление", чтобы добавить его в базу для анализа
						</TextBlock>
					}




					{compArt && <CardBlock
						className='flex flex-col justify-between'
					>

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
						</section>

						<CardBlock
							className="flex flex-col "
						>

							<ButtonBlock
								className="delete-c"
								onClick={handleDelete}
							>
								Удалить артикул из АБД
							</ButtonBlock>



							{!isEditing &&

								<ButtonBlock
									className="edit-c"
									onClick={() => { setIsEditing(true) }}
								>
									Редактировать данные артикула
								</ButtonBlock>



							}










						</CardBlock>


						{isEditing && <CardBlock
							className='flex flex-col p-2 
							border border-yellow-500 space-y-2
							bg-yellow-500/5
							'
						>

							<TextBlock
								className=" p-1 text-lg text-sky-500"
							>
								Обновление данных
							</TextBlock>


							<RowBlock className="space-x-2" >
								<TextBlock>
									Производитель:
								</TextBlock>
								<select
									name="selectedProd"
									className='InputBlock focus:bg-sky-900 w-full'
									value={prod}
									onChange={(e) => { setProd(e.target.value) }}
								>
									<option value="">Выбери производителя</option>
									{prods.map((prod, index) => (
										<option key={index} value={prod}>
											{prod}
										</option>
									))}
								</select>
							</RowBlock>

							<InputBlock
								type="text"
								name="sharteLink"
								className="text-center"
								placeholder="Введи cсылку Шарте..."
								onChange={(e) => setSharteLink(e.target.value)}
								value={sharteLink}


							/>




							<ButtonBlock
								className="confirm-c"
								onClick={handleUpdate}
							>
								Изменить данные
							</ButtonBlock>


							<ButtonBlock
								className="cancel-c"
								onClick={() => { setIsEditing(false) }}
							>
								Отменить редактирование
							</ButtonBlock>


						</CardBlock>}

					</CardBlock>}


				</CardBlock>





			</CardBlock>



		</CardBlock>
	)
}
