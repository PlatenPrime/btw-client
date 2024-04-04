import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, ImageBlock, InputBlock, ModalWrapper, PageBTW, Spinner, TextBlock } from '../../components'
import { Link, useNavigate } from 'react-router-dom'
import useFetchRemains from '../../hooks/useFetchRemains'
import useFetchArts from '../../hooks/useFetchArts'
import usePosesStore from './stores/posesStore'
import useAskStore from './stores/asksStore'
import useAuthStore from '../Auth/authStore'
import { toast } from 'react-toastify'
import { getArtDataBtrade } from "../../utils/getArtDataBtrade"
import { CancelIcon, OkIcon } from '../../components/UI/Icons'



import { sendMessageToUser } from '../../utils/sendMessagesTelegram'













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




	async function handleCreateAsk() {
		try {

			setIsCreatingAsk(true)

			const newAskData = {
				artikul: newAskArtikul,
				quant: newAskQuant,
				com: newAskCom,
				status: "new",
				asker: user._id
			}

			const newAsk = await createAsk(newAskData)


			if (newAsk) toast.success(`Запит на ${newAskArtikul} створено`)

			console.log(newAsk);


		} catch (error) {
			console.log(error)
		} finally {
			setNewAskArtikul('')
			setNewAskQuant('')
			setNewAskCom('')
			setIsCreatingAsk(false)
			setShowModalCreateAsk(false)

		}



	}





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
		const correctRows = ["10-12", "14-16", "18-20", "22-24", "27-29"]


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















	return (
		<PageBTW
			className=" "
		>
			<HeaderBlock
				className="bg-pink-500 shadow-2xl shadow-pink-500"
			>
				Дефіцити
			</HeaderBlock>









			{isFetchingPoses ?


				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="rgb(236 72 153)" />
				</ContainerBlock>

				:

				<>


					<ButtonGroup>


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



					</ButtonGroup>






					{/* Список чекбоксов рядов для фильтра */}





					<ContainerBlock className="flex flex-wrap gap-2 ">


						<CardBlock className="inline-flex items-center bg-pink-500/20 hover:bg-pink-500/50 p-2 gap-1">
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
								<CardBlock key={index} className="inline-flex items-center bg-pink-500/20 hover:bg-pink-500/50  p-2 gap-1">
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











					{/* MODAL CREATE ASK */}




					{showModalCreateAsk && <ModalWrapper
						onCancel={() => setShowModalCreateAsk(false)}
						title="Створення запиту на зняття "
					>


						<CardBlock
							className="flex flex-col space-y-8 min-w-fit max-w-lg text-xl "
						>

							<CardBlock className="grid grid-cols-1 gap-1">
								<CardBlock
									className="grid justify-self-center w-full place-content-center bg-white"
								>
									<ImageArt
										size={150}
										artikul={newAskArtikul?.length === 9 ? newAskArtikul : "1102-3092"}
									/>
								</CardBlock>
								<TextBlock className="text-xl grid justify-self-center italic">
									{artsDB?.find((art) => art.artikul === newAskArtikul)?.nameukr || newAskArtikul}
								</TextBlock>
							</CardBlock>


							<CardBlock className="space-y-2">


								<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
									<label className=" justify-self-center self-center md:justify-self-start" htmlFor="artikul">Артикул:</label>
									<InputBlock
										type="text"
										id="artikul"
										name="artikul"
										autoComplete="off"
										value={newAskArtikul}
										onChange={(e) => setNewAskArtikul(e.target.value)}
									/>
								</CardBlock>





								<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
									<label className=" justify-self-center self-center md:justify-self-start" htmlFor="quant">Кількість:</label>
									<InputBlock
										type="number"
										id="quant"
										name="quant"
										autoComplete="off"
										value={newAskQuant}
										onChange={(e) => setNewAskQuant(e.target.value)}
									/>
								</CardBlock>

								<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
									<label className=" justify-self-center self-center md:justify-self-start" htmlFor="com">Комент:</label>
									<InputBlock
										type="text"
										id="com"
										name="com"
										autoComplete="off"
										value={newAskCom}
										onChange={(e) => setNewAskCom(e.target.value)}
									/>
								</CardBlock>

							</CardBlock>



							<CardBlock className="grid grid-cols-2 space-x-2">


								<ButtonBlock
									className="red-b flex justify-center items-center"
									onClick={() => setShowModalCreateAsk(false)}
								>
									<TextBlock className="text-2xl"><CancelIcon /></TextBlock>
									<TextBlock className=""> Скасувати</TextBlock>

								</ButtonBlock>



								<ButtonBlock
									disabled={!newAskArtikul}
									type="submit"
									className="green-b flex justify-center items-center"
									onClick={handleCreateAsk}
								>


									{isCreatingAsk ?

										<Spinner color="green" />
										:
										<>
											<TextBlock className="text-2xl"><OkIcon /></TextBlock>
											<TextBlock className=""> 	Створити</TextBlock>
										</>

									}

								</ButtonBlock>
							</CardBlock>



						</CardBlock>
					</ModalWrapper>
					}


















					{isFetchingPoses
						?
						<ContainerBlock>
							<Spinner color="rgb(236 72 153)" />
						</ContainerBlock>
						:

						<ContainerBlock
							className="grid lg:grid-cols-2 gap-2 p-2 "

						>

							<TextBlock
								className="text-xl bg-teal-500/50 hover:bg-teal-500 text-white  rounded-xl"
							>
								Позиції всього: {allPoses?.length}
							</TextBlock>



							<TextBlock
								className="text-xl bg-sky-500/50 hover:bg-sky-500 text-white  rounded-xl"
							>
								Артикули: {artsDB?.length}
							</TextBlock>


							{/* <TextBlock>
						Залишки: {remains ? remains["1102-0260"] : null}
					</TextBlock> */}

							<TextBlock
								className="text-xl bg-orange-500/50 hover:bg-orange-500 text-white  rounded-xl"
							>
								Запаси: {stocks?.length}
							</TextBlock>

							<TextBlock
								className="text-xl bg-pink-500/50 hover:bg-pink-500 text-white  rounded-xl"
							>
								Дефіцити: {defs?.length}
							</TextBlock>

						</ContainerBlock>
					}



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





					{defs?.length > 0 ?





						<ContainerBlock
							className="space-y-2 pb-4"
						>
							{defs?.map((def, i) =>
								<CardBlock
									key={i}
									className="grid  lg:grid-cols-6 gap-2 p-2  bg-pink-500/5 hover:bg-pink-500/10 rounded-xl"

								>


									<CardBlock
										className="lg:col-span-3 flex "

									>

										<CardBlock
											className="lg:col-span-1 bg-white flex justify-center items-center rounded-l-lg"
										>
											<ImageArt size={100} artikul={def.artikul} className="rounded-l-lg" />

										</CardBlock>


										<TextBlock
											className="lg:col-span-2  w-full p-2 text-xl text-center italic bg-sky-500/10 hover:bg-sky-500 rounded-r-lg cursor-pointer "
											onClick={() => {
												const artId = artsDB?.find(art => art.artikul === def.artikul)?._id || "";
												const url = `/arts/${artId}`;
												window.open(url, "_blank");
											}}
										>
											{artsDB?.find(art => art.artikul === def.artikul)?.nameukr || def.artikul}
										</TextBlock>

									</CardBlock>





									<CardBlock
										className="lg:col-span-2 justify-self-stretch flex flex-col items-start justify-around p-3 bg-slate-700/50 rounded-lg "
									>


										<TextBlock
											className="text-xl text-left space-x-2"
										>
											<TextBlock className="text-xl text-left " >Запаси:</TextBlock>

											<TextBlock
												className="text-teal-300"
											>{
													def?.quant}
											</TextBlock>
										</TextBlock>



										<TextBlock
											className="text-xl text-left space-x-2"
										>
											<TextBlock>База:</TextBlock>
											<TextBlock className="text-amber-300">{def?.remain}</TextBlock>
										</TextBlock>


										<TextBlock
											className="text-xl text-left space-x-2"
										>
											<TextBlock>Дефіцит:</TextBlock>
											<TextBlock className="text-pink-300">{def?.dif}</TextBlock>
										</TextBlock>

									</CardBlock>







									<CardBlock
										className={`
										
										${asks?.find(ask => ask.artikul === def.artikul)?.status === "new" ?
												"bg-pink-500/50 "
												:
												""}
										
										lg:col-span-1 flex justify-center items-center`}
									>

										<ButtonBlock
											className="pink-b"
											onClick={() => {
												setShowModalCreateAsk(true)
												setNewAskArtikul(def.artikul)
											}}
										>
											Створити запит
										</ButtonBlock>

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




				</>
			}


		</PageBTW >
	)
}
