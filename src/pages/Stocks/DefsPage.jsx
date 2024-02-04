import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, ImageBlock, InputBlock, ModalWrapper, PageBTW, Spinner, TextBlock } from '../../components'
import { Link } from 'react-router-dom'
import useFetchRemains from '../../hooks/useFetchRemains'
import useFetchArts from '../../hooks/useFetchArts'
import usePosesStore from './stores/posesStore'
import useAskStore from './stores/asksStore'
import useAuthStore from '../Auth/authStore'
import { toast } from 'react-toastify'
import { getArtDataBtrade } from "../../utils/getArtDataBtrade"













export default function DefsPage() {




	const { remains, loadingRemains, errorRemains } = useFetchRemains()
	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()

	const { allPoses, getAllPoses, clearPosesStore } = usePosesStore()
	const { createAsk } = useAskStore()
	const { user } = useAuthStore()



	const [isFetchingPoses, setIsFetchingPoses] = useState(false)
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





	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [newAskQuant, setNewAskQuant] = useState('')


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
				status: "new",
				asker: user._id
			}

			const newAsk = await createAsk(newAskData)


			if (newAsk) toast.success(`Запит на ${newAskArtikul} створено`)

			console.log(newAsk);


		} catch (error) {
			console.log(error)
		} finally {
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




	return (
		<PageBTW
			className=" "
		>
			<HeaderBlock
				className=" shadow-md shadow-pink-500"
			>
				Дефіцити
			</HeaderBlock>




			<ButtonGroup>


				<ButtonBlock
					className="sky-b"
					onClick={calculateDefs}
				>
					Показати дефіцити
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


				<CardBlock className="inline-flex items-center bg-pink-500/20 p-2 gap-1">
					<InputBlock
						className="appearance-none h-6 w-6 checked:bg-pink-500 rounded-sm border-none"
						type="checkbox"
						checked={selectedRowTitles.length === uniqueRowTitles.length}
						onChange={handleSelectAllChange}
					/>
					<span className="text-pink-100 text-lg">Вибрати всі</span>
				</CardBlock>


				{uniqueRowTitles
					.sort((a, b) => parseInt(a) - parseInt(b))


					.map((title, index) => (
						<CardBlock key={index} className="inline-flex items-center bg-pink-500/20  p-2 gap-1">
							<InputBlock
								className="appearance-none  h-6 w-6 checked:bg-pink-500 rounded-xl border-none "
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
					className="flex flex-col space-y-8 min-w-fit max-w-lg "
				>

					<CardBlock className="grid grid-cols-1 gap-1">
						<CardBlock
							className="grid justify-self-center"
						>
							<ImageArt
								size={150}
								artikul={newAskArtikul?.length === 9 ? newAskArtikul : "1102-3092"}
							/>
						</CardBlock>
						<TextBlock className="text-xl grid justify-self-center italic">
							{artsDB?.find((art) => art.artikul === newAskArtikul)?.nameukr}
						</TextBlock>
					</CardBlock>


					<CardBlock className="space-y-2">


						<CardBlock className="grid grid-rows-2 ">
							<label className="justify-self-center text-xl" htmlFor="artikul">Артикул:</label>
							<InputBlock
								type="text"
								id="artikul"
								name="artikul"
								autoComplete="off"
								value={newAskArtikul}
								onChange={(e) => setNewAskArtikul(e.target.value)}
							/>
						</CardBlock>





						<CardBlock className="grid grid-rows-2 ">
							<label className="justify-self-center text-xl" htmlFor="quant">Кількість:</label>
							<InputBlock
								type="number"
								id="quant"
								name="quant"
								autoComplete="off"
								value={newAskQuant}
								onChange={(e) => setNewAskQuant(e.target.value)}
							/>
						</CardBlock>

					</CardBlock>



					<CardBlock className="grid grid-cols-2 space-x-2">
						<ButtonBlock
							type="button"
							className="red-b"
							onClick={() => setShowModalCreateAsk(false)}
						>
							Скасувати
						</ButtonBlock>
						<ButtonBlock
							disabled={!newAskArtikul}
							type="submit"
							className="green-b"
							onClick={handleCreateAsk}
						>


							{isCreatingAsk ?

								<Spinner color="green" />
								:
								<TextBlock>	Створити</TextBlock>
							}








						</ButtonBlock>
					</CardBlock>



				</CardBlock>
			</ModalWrapper>
			}





			{/* Полоска анализа */}

			{isFetchingQuants &&
				<ContainerBlock>


					<div className="relative pt-1 px-4">


						<div className="flex px-4 mb-2 items-center justify-between">


							<span className="text-sm font-semibold inline-block text-pink-100">
								{progress.toFixed(2)}%
							</span>
							<span>{stocks[currentFetchingStock - 1]?.artikul}</span>

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












			{isFetchingPoses
				?
				<ContainerBlock>
					<Spinner color="rgb(236 72 153)" />
				</ContainerBlock>
				:

				<ContainerBlock
					className="flex flex-col items-start  p-2 "

				>

					<TextBlock
						className="text-xl text-teal-100"
					>
						Позиції всього: {allPoses?.length}
					</TextBlock>
					<TextBlock
						className="text-xl text-sky-100"
					>
						Артикули: {artsDB?.length}
					</TextBlock>


					{/* <TextBlock>
						Залишки: {remains ? remains["1102-0260"] : null}
					</TextBlock> */}

					<TextBlock
						className="text-xl text-orange-100"
					>
						Запаси: {stocks?.length}
					</TextBlock>

					<TextBlock
						className="text-xl text-pink-100"
					>
						Дефіцити: {defs?.length}
					</TextBlock>

				</ContainerBlock>
			}



			{defs?.length > 0 ?





				<ContainerBlock
					className="space-y-2 pb-4"
				>
					{defs?.map((def, i) =>
						<CardBlock
							key={i}
							className="grid  lg:grid-cols-3 p-2  bg-pink-500/5 rounded-xl"
						>
							<CardBlock
								className=""
							>

								<CardBlock
									className="bg-white flex justify-center rounded-t-lg"
								>
									<ImageArt size={100} artikul={def.artikul} />

								</CardBlock>


								<TextBlock
									className="p-2 text-xl text-center italic bg-sky-500/10 rounded-b-lg "
								>
									{artsDB?.find(art => art.artikul === def.artikul)?.nameukr || def.artikul}
								</TextBlock>

							</CardBlock>

							<CardBlock
								className="justify-self-center flex flex-col justify-around p-3 bg-slate-700 rounded-lg "
							>
								<TextBlock
									className="text-xl text-left"
								> Запаси: {def?.quant}</TextBlock>

								<TextBlock
									className="text-xl text-left"
								>
									База: {def?.remain}
								</TextBlock>
								<TextBlock
									className="text-xl text-left"
								>
									Дефіцит: {def?.dif}
								</TextBlock>

							</CardBlock>


							<CardBlock
								className="flex justify-center items-center"
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

					<TextBlock>
						Дефіцитів немає
					</TextBlock>
			}







		</PageBTW >
	)
}
