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


	const [showModal, setShowModal] = useState(false);


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
		setShowModal(true);
	}

	const confirmDelete = async () => {
		// try {
		// 	const res = await axios.delete(`comps/${compArt._id}`);
		// 	console.log(res);
		 	setShowModal(false);
		// } catch (error) {
		// 	console.log(error);
		// }
	}

	const closeModal = () => {
		setShowModal(false);
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
			className=""
		>




			<CardBlock
				className="border border-violet-500 flex flex-col justify-center p-2 space-y-3"
			>



				<CardBlock
					className="flex justify-center"
				>
					<InputBlock
						type="text"
						name="compSearch"
						className="text-center text-xl"
						placeholder="Введи артикул..."
						onChange={(e) => { setCompSearch(e.target.value); setCompArt(null); setIsAddEnable(false); setIsEditing(false) }}
						value={compSearch}


					/>



					<ButtonBlock
						onClick={handleSearch}
						className="add-c"
						disabled={!artikulDB}

					>
						Проверить
					</ButtonBlock>

				</CardBlock>




				{artikulDB &&

					<CardBlock
						className="flex flex-col items-center justify-center bg-violet-600/50 p-2 space-y-4"
					>
						<TextBlock className='text-lg text-center' >

							{artikulDB.nameukr}

						</TextBlock>

						<ImageBlock
							src={artikulDB ? photoSrc : "https://sharik.ua/images/elements_big/1102-3092_m1.jpg"}
							alt="Если ты видишь эту надпись, значит ты ошибся с артикулом"
							width={200}
							height={200}
							className=" rounded-2xl shadow-md shadow-white "

						/>



					</CardBlock>

				}





			</CardBlock>







			<CardBlock
				className='flex flex-col border border-violet-500 '
			>






				<CardBlock
					className=''

				>


					{isAddEnable &&
						<TextBlock
							className="bg-rose-400/10 text-2xl p-4"
						>
							Данный артикул не анализируется. Перейди во вкладку "Добавление", чтобы добавить его в базу для анализа
						</TextBlock>
					}




					{compArt && <CardBlock
						className='  '
					>

						<table className='mx-auto' >
							<tbody  >
								<tr className="flex justify-between even:bg-violet-500/10 odd:bg-violet-500/20" >
									<td className=' ' >Артикул:</td>
									<td className='  ' >{compArt.artikul}</td>
								</tr>


								<tr className="flex justify-between even:bg-violet-500/10 odd:bg-violet-500/20" >
									<td className='flex'  >Ссылка Шарте:</td>
									<td>
										<a
											className='hover:bg-violet-600/20 p-2 rounded'
											href={compArt.competitorsLinks.sharteLink}
											target='_blanked'
										>
											{compArt.competitorsLinks.sharteLink.slice(0, 20)}...
										</a>
									</td>
								</tr>

								<tr className="flex justify-between even:bg-violet-500/10 odd:bg-violet-500/20" >
									<td className='flex'  >Цена БТрейд:</td>
									<td>{compArt.price.btrade}</td>
								</tr>

								<tr className="flex justify-between even:bg-violet-500/10 odd:bg-violet-500/20" >
									<td className='flex'  >Цена Шарте:</td>
									<td>{compArt.price.sharte}</td>
								</tr>

								<tr className="flex justify-between even:bg-violet-500/10 odd:bg-violet-500/20" >
									<td className='flex'  >Наличие Бтрейд:</td>
									<td>{compArt.avail.btrade}</td>
								</tr>
								<tr className="flex justify-between even:bg-violet-500/10 odd:bg-violet-500/20" >
									<td className='flex'  >Наличие Шарте:</td>
									<td>{compArt.avail.sharte ? "Есть" : "Нет"}</td>
								</tr>
							</tbody>
						</table>


						<CardBlock className='flex justify-center' >


							{compArt &&

								<>
									{!isEditing &&
										<ButtonBlock
											className="edit-c"
											onClick={() => { setIsEditing(true) }}
										>
											Редактировать данные артикула
										</ButtonBlock>



									}

									{isEditing && <ButtonBlock
										className="cancel-c"
										onClick={() => { setIsEditing(false) }}
									>
										Отменить редактирование
									</ButtonBlock>}


								</>
							}








						</CardBlock>



					</CardBlock>}





				</CardBlock>


				{isEditing &&

					<CardBlock
						className=' border border-violet-500 bg-violet-500/10 space-y-4 p-2'
					>

						<TextBlock
							className=" p-4 rounded text-lg bg-violet-500/20 "
						>
							Редактирование данных
						</TextBlock>






						<RowBlock className=" flex flex-col items-center space-y-2 " >
							<select
								name="selectedProd"
								className='InputBlock focus:bg-violet-900'
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


							<InputBlock
								type="text"
								name="sharteLink"
								className="text-center"
								placeholder="Введи cсылку Шарте..."
								onChange={(e) => setSharteLink(e.target.value)}
								value={sharteLink}
							/>


							<ButtonBlock
								className="success-c "
								disabled={!prod || !sharteLink}

								onClick={handleUpdate}
							>
								Изменить данные
							</ButtonBlock>


							<ButtonBlock
								className="delete-c "
								onClick={handleDelete}
							>
								Удалить артикул из базы анализа
							</ButtonBlock>

							{showModal && (
								<div className="fixed inset-0 flex items-center justify-center z-50">
									<div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"  onClick={() => {setShowModal(false)}} ></div>
									<div className="modal-container bg-violet-500/80 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
										<div className="modal-content py-4 text-left px-6">
											<p className="text-xl font-semibold">Вы уверены, что хотите удалить артикул из базы данных?</p>
											<div className="mt-4 flex justify-evenly space-x-4">
												<ButtonBlock className="delete-c font-semibold w-1/4 " onClick={confirmDelete}>Да</ButtonBlock>
												<ButtonBlock className="confirm-c font-semibold w-1/4  " onClick={closeModal}>Отмена</ButtonBlock>
											</div>
										</div>
									</div>
								</div>
							)}

						</RowBlock>



					</CardBlock>}


			</CardBlock>



		</CardBlock>
	)
}
