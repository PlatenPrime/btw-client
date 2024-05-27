import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, ImageBlock, InputBlock, ModalWrapper, PageBTW, Spinner, TextBlock } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import useFetchRemains from '../../hooks/useFetchRemains'
import useFetchArts from '../../hooks/useFetchArts'
import usePosesStore from '../Stocks/stores/posesStore'
import useAskStore from '../Asks/stores/asksStore'
import useAuthStore from '../Auth/authStore'
import { toast } from 'react-toastify'
import { getArtDataBtrade } from "../../utils/getArtDataBtrade"
import { CancelIcon, OkIcon } from '../../components/UI/Icons'



import { sendMessageToUser } from '../../utils/sendMessagesTelegram'
import ModalCreateAsk from './components/modals/ModalCreateAsk'













export default function DefsPage() {


	const navigate = useNavigate()




	const { remains, loadingRemains, errorRemains } = useFetchRemains()
	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()

	const { allPoses, getAllPoses, clearPosesStore } = usePosesStore()
	const { createAsk, getAllAsks, asks } = useAskStore()
	const { user } = useAuthStore()



	const [isFetchingPoses, setIsFetchingPoses] = useState(false)
	const [isFetchingAsks, setIsFetchingAsks] = useState(false)
	const [isCreatingAsk, setIsCreatingAsk] = useState(false)
	const [isFetchingQuants, setIsFetchingQuants] = useState(false)


	const [currentFetchingStock, setCurrentFetchingStock] = useState(1)
	const [progress, setProgress] = useState(0)


	const [stocks, setStocks] = useState(null)
	const [defs, setDefs] = useState(null)
	const [uniqueRowTitles, setUniqueRowTitles] = useState([]);
	const [selectedRowTitles, setSelectedRowTitles] = useState([]);
	// Состояние для управления всеми чекбоксами
	const [selectAll, setSelectAll] = useState(true);

	const [correctRows, setCorrectRows] = useState([]);





	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [newAskQuant, setNewAskQuant] = useState('')
	const [newAskCom, setNewAskCom] = useState('')


	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)





	console.log("Дефіцити: ", defs);











	// Стартовый просчет дефицитов на основе остатков из remains. 


	function isNewerThanThreeYears(dateString) {
		if (!dateString) {
			return true; // Если даты нет, считаем, что позиция актуальна
		}

		// Преобразование строки даты в объект Date
		const dateParts = dateString.split('.');
		const year = parseInt(dateParts[1], 10) + 2000; // Добавляем 2000 к году
		const month = parseInt(dateParts[0], 10) - 1; // Вычитаем 1 из месяца (начинается с 0)

		const posDate = new Date(year, month);

		// Проверка, новее ли дата чем текущая дата минус 3 года
		const threeYearsAgo = new Date();
		threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

		return posDate >= threeYearsAgo;
	}


	const reduceStocks = useMemo(() => {
		return (allPoses) => {

			return allPoses
				.filter((pos) => selectedRowTitles.length === 0 || selectedRowTitles.includes(pos.rowTitle))
				.filter((pos) => pos.sklad === "pogrebi" && isNewerThanThreeYears(pos.date))
				.filter((stock) => { return /^\d{4}-\d{4}$/.test(stock.artikul) })
				.filter((pos) => pos?.quant !== 0)
				.reduce((result, currentStock) => {


					const existingStock = result.find((obj) => obj.artikul === currentStock.artikul);

					if (existingStock) {
						// Если объект с таким artikul уже есть, обновляем quant
						existingStock.quant += currentStock.quant;
					} else {
						// Если нет, добавляем новый объект
						result.push({ artikul: currentStock.artikul, quant: currentStock.quant, });
					}
					return result;
				}, [])
				.sort((a, b) => a.artikul.localeCompare(b.artikul))


				;


		}



	}, [selectedRowTitles]);




	const filterStocksByDif = useMemo(() => {
		return (stocks) => {
			return stocks
				.filter((stock) => {
					const remainsQuant = remains[stock.artikul];
					return remainsQuant && stock.quant >= remainsQuant;
				})
				.map((def) => ({
					...def,
					dif: def.quant - remains[def.artikul],
					remain: remains[def.artikul]
				}));
		}
	}, [remains]);



	const calculateDefs = useCallback(() => {


		if (allPoses && remains) {
			const reducedStocks = reduceStocks(allPoses);
			console.log("reducedStocks: ", reducedStocks);

			setStocks(reducedStocks);

			const defs = filterStocksByDif(reducedStocks);
			setDefs(defs);
		}


	}, [allPoses, reduceStocks, filterStocksByDif, remains]);




	// HANDLERS




	async function handleActualizeDefs() {

		let newDefs = []
		try {
			const totalItems = stocks?.length
			let completedItems = 0

			setIsFetchingQuants(true)






			for (const stock of stocks) {
				console.log(stock)
				const { quant } = await getArtDataBtrade(stock.artikul)
				if (quant && stock.quant >= quant) {
					console.log("Добавляем: ", stock.artikul);
					newDefs = [...newDefs, {
						...stock,
						currentQuant: quant,
						dif: stock.quant - quant,
						remain: quant
					}]
				}
				completedItems++
				setCurrentFetchingStock(prev => prev + 1)

				const progressValue = (completedItems / totalItems) * 100
				setProgress(progressValue)

			}
		} catch (error) {
			console.log(error)

		} finally {
			setIsFetchingQuants(false)
			setProgress(0)
			setCurrentFetchingStock(1)
			setDefs(newDefs)


			if (newDefs) {
				try {
					sendMessageToUser(`
					${newDefs?.length > 0 ?
							`Є наступні дефіцити:
						${newDefs?.map(def => `    ${def?.artikul} - ${def?.dif}
						`)}`
							:
							"Дефіцитів немає"
						}
					`,
						user?.telegram)
				} catch (error) {
					console.log(error);

				}

			}







		}
	}




	function handleRowTitleChange(e) {
		const title = e.target.value;
		setSelectedRowTitles((prev) => {
			if (prev.includes(title)) {
				return prev.filter((t) => t !== title);
			} else {
				return [...prev, title];
			}
		});
		console.log("selectedRowTitles: ", selectedRowTitles);
		calculateDefs()

	};


	// Обработчик изменения состояния для чекбокса "Выбрать все"
	const handleSelectAllChange = () => {
		setSelectAll((prev) => !prev);
		setSelectedRowTitles((prev) => (prev.length === uniqueRowTitles.length ? [] : [...uniqueRowTitles]));
	};



	useEffect(() => {
		console.log("selectedRowTitles: ", selectedRowTitles);
		calculateDefs();
	}, [selectedRowTitles]);



	const handleSelectCorrectRows = () => {
		const correctRows = ["06-08", "10-12", "14-16", "18-20", "22-24", "27-29"]


		setSelectedRowTitles(uniqueRowTitles.filter(rowTitle => correctRows.includes(rowTitle)));
	}













	// EFFECTS




	useEffect(() => {


		const fetchPoses = async () => {

			try {
				setIsFetchingPoses(true)
				const allPoses = await getAllPoses()


			} catch (error) {
				console.log(error);

			} finally {
				setIsFetchingPoses(false)
			}
		}

		fetchPoses()


		localStorage.removeItem('remainsData');




		return async () => {
			await clearPosesStore()
		}

	}, [getAllPoses, clearPosesStore])










	useEffect(() => {


		const titles = [...new Set(allPoses.map(pos => pos.rowTitle))];
		setUniqueRowTitles(titles);
		setSelectedRowTitles(titles)
		console.log(titles);
		console.log("selectedRowTitles Effect:", selectedRowTitles);






	}, [allPoses])






	useEffect(() => {


		const fetchAsks = async () => {

			try {
				setIsFetchingAsks(true)
				const allPoses = await getAllAsks()


			} catch (error) {
				console.log(error);

			} finally {
				setIsFetchingAsks(false)
			}
		}

		fetchAsks()




	}, [getAllAsks])







	if (isFetchingPoses) {
		return (
			<PageBTW>
				<HeaderBlock
					className="text-transparent  bg-gradient-to-b from-slate-700/50 to-slate-800/50"
				>
					Дефіцити
				</HeaderBlock>
				<ContainerBlock
					className="w-full h-full flex justify-center items-center"
				>
					<Spinner color="rgb(236 72 153)" />
				</ContainerBlock>

			</PageBTW>
		)
	}









	return (
		<PageBTW
			className=" "
		>
			<HeaderBlock
				className="bg-pink-500 shadow-lg shadow-pink-500"
			>
				Дефіцити
			</HeaderBlock>



			{/* MODAL CREATE ASK */}



			<ModalCreateAsk
				artikul={newAskArtikul}
				showModalCreateAsk={showModalCreateAsk}
				setShowModalCreateAsk={setShowModalCreateAsk}
			/>





			<ButtonGroup>

				<ButtonGroup.Actions>


					<ButtonBlock
						className="sky-b"
						onClick={calculateDefs}
					>
						Показати дефіцити
					</ButtonBlock>


					<ButtonBlock
						className="orange-b"
						onClick={handleSelectCorrectRows}
					>
						Правильні ряди
					</ButtonBlock>



					<ButtonBlock
						className="pink-b"
						onClick={handleActualizeDefs}
					>
						Актуалізація дефіцитів
					</ButtonBlock>

				</ButtonGroup.Actions>

			</ButtonGroup>




			{/* Полоска анализа */}

			{isFetchingQuants &&
				<ContainerBlock>


					<div className="relative pt-1 px-4">


						<div className="flex px-4 mb-2 items-center justify-between">


							<span className="text-sm font-semibold inline-block text-pink-100">
								{progress.toFixed(2)}%
							</span>
							<span>{artsDB.find(art => art?.artikul === stocks[currentFetchingStock - 1]?.artikul)?.nameukr || stocks[currentFetchingStock - 1]?.artikul}</span>

							<span>{currentFetchingStock} / {stocks?.length}</span>



						</div>


						<div className="flex h-2 mb-4 overflow-hidden text-xs bg-violet-200">
							<div
								style={{ width: `${progress}%` }}
								className="flex flex-col justify-center text-center text-white bg-pink-500 shadow-none whitespace-nowrap"
							></div>
						</div>
					</div>

				</ContainerBlock>

			}



			{/* Список чекбоксов рядов для фильтра */}



			<CardBlock
				className="grid grid-cols-1 lg:grid-cols-2 gap-2"
			>
				<ContainerBlock className="flex flex-wrap gap-2 ">


					<CardBlock className="inline-flex items-center bg-gradient-to-b from-slate-700/50 to-slate-900/50 p-2 gap-1">
						<InputBlock
							className="appearance-none h-6 w-6 checked:bg-pink-500 rounded-sm border-none cursor-pointer"
							type="checkbox"
							checked={selectedRowTitles.length === uniqueRowTitles.length}
							onChange={handleSelectAllChange}
						/>
						<span className="text-pink-100 text-lg">Вибрати всі</span>
					</CardBlock>

					{uniqueRowTitles
						.sort((a, b) => parseInt(a) - parseInt(b))


						.map((title, index) => (
							<CardBlock key={index} className="inline-flex items-center bg-gradient-to-b from-slate-700/50 to-slate-900/50 p-2 gap-1">
								<InputBlock
									className="appearance-none  h-6 w-6 checked:bg-pink-500 rounded-xl border-none cursor-pointer"
									type="checkbox"
									value={title}
									checked={selectedRowTitles.includes(title)}
									onChange={handleRowTitleChange}
								/>
								<span className=" text-pink-100 text-lg">{title}</span>
							</CardBlock>
						))}
				</ContainerBlock>


				<ContainerBlock
					className="grid lg:grid-cols-2 gap-2 p-2 "

				>

					<TextBlock
						className="flex justify-between px-2  text-lg  bg-gradient-to-b from-teal-500/20 to-teal-800/10 rounded-xl"
					>
						<span>
							Позиції всього:
						</span>
						<span>
							{allPoses?.length}
						</span>
					</TextBlock>



					<TextBlock
						className="flex justify-between px-2  text-lg  bg-gradient-to-b from-sky-500/20 to-sky-800/10 rounded-xl"
					>
						<span>
							Артикули:
						</span>
						<span>
							{artsDB?.length}
						</span>
					</TextBlock>



					<TextBlock
						className="flex justify-between px-2  text-lg  bg-gradient-to-b from-teal-500/20 to-teal-800/10 rounded-xl"
					>
						<span>
							Унікальні:
						</span>
						<span>
							{stocks?.length}
						</span>
					</TextBlock>



					<TextBlock
						className="flex justify-between px-2  text-lg  bg-gradient-to-b from-pink-500/20 to-pink-800/10 rounded-xl"
					>
						<span>
							Дефіцити:
						</span>
						<span>
							{defs?.length}
						</span>
					</TextBlock>




				</ContainerBlock>




			</CardBlock>

















			{defs?.length > 0 ?





				<ContainerBlock
					className="space-y-2 pb-4"
				>
					{defs?.map((def, i) =>
						<CardBlock
							key={i}
							className="grid text-sm  lg:grid-cols-6 gap-2 p-2 bg-gradient-to-b from-slate-700/50 to-slate-900/50   rounded-xl"

						>


							<CardBlock
								className="lg:col-span-3 flex "

							>

								<CardBlock
									className="lg:col-span-1 bg-white flex justify-center items-center rounded-l-lg"
								>
									<ImageArt size={100} artikul={def.artikul} className="rounded-l-lg" />

								</CardBlock>


								<CardBlock
									className=" w-full flex flex-col items-center justify-center px-2 
									bg-gradient-to-b from-sky-500/10 to-sky-800/10
									hover:shadow-lg hover:shadow-sky-500
									 cursor-pointer rounded-r-xl "

									onClick={() => {
										const artId = artsDB?.find(art => art.artikul === def.artikul)?._id || "";
										const url = `/arts/${artId}`;
										window.open(url, "_blank");
									}}
								>

									<TextBlock
										className=" justify-center text-3xl"
									>

										{def?.artikul}
									</TextBlock>

									<TextBlock
										className=" justify-center items-center w-full text-center text-base italic"
									>

										{artsDB?.find(art => art.artikul === def.artikul)?.nameukr?.slice(10)}
									</TextBlock>

								</CardBlock>


							</CardBlock>





							<CardBlock
								className="lg:col-span-2 justify-self-stretch flex flex-col items-start justify-around  rounded-lg "
							>


								<CardBlock
									className="text-lg p-2 flex justify-between w-full bg-gradient-to-b from-slate-700/50 to-slate-900/50 rounded-lg"
								>
									<TextBlock className=" " >
										Запаси:
									</TextBlock>

									<TextBlock
										className=""
									>
										{def?.quant}
									</TextBlock>
								</CardBlock>


								<CardBlock
									className="text-xl p-2 flex justify-between w-full bg-gradient-to-b from-slate-700/50 to-slate-900/50 rounded-lg"
								>
									<TextBlock className=" " >
										База:
									</TextBlock>

									<TextBlock
										className=""
									>
										{def?.remain}
									</TextBlock>
								</CardBlock>


								<CardBlock
									className="text-xl p-2 flex justify-between w-full bg-gradient-to-b from-slate-700/50 to-slate-900/50 rounded-lg"
								>
									<TextBlock className=" " >
										Дефіцит:
									</TextBlock>

									<TextBlock className="text-red-500">-{def?.dif}</TextBlock>
								</CardBlock>



							</CardBlock>







							<CardBlock
								className={`
										
										${asks?.find(ask => ask.artikul === def.artikul)?.status === "new" ?
										"bg-gradient-to-b from-indigo-500/50 to-indigo-800/50"
										:
										""}
										
										lg:col-span-1 flex justify-center items-center rounded-xl`}
							>

								{asks?.find(ask => ask.artikul === def.artikul)?.status === "new" ?
									<TextBlock className="text-xl text-center text-white">
										Запит в роботі
									</TextBlock>
									:
									<ButtonBlock
										className="indigo-b"
										onClick={() => {
											setShowModalCreateAsk(true)
											setNewAskArtikul(def.artikul)
										}}
										disabled={asks?.find(ask => ask.artikul === def.artikul)?.status === "new"}
									>
										Створити запит
									</ButtonBlock>
								}



							</CardBlock>




						</CardBlock>
					)}

				</ContainerBlock>

				:

				isFetchingPoses
					?

					null
					:
					<ContainerBlock>
						<TextBlock>
							Дефіцитів немає
						</TextBlock>
					</ContainerBlock>

			}




		</PageBTW >
	)
}
