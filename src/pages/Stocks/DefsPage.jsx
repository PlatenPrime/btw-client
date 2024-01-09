import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, ImageArt, ImageBlock, InputBlock, ModalWrapper, PageBTW, Spinner, TextBlock } from '../../components'
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






	const [stocks, setStocks] = useState(null)
	const [defs, setDefs] = useState(null)






	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [newAskQuant, setNewAskQuant] = useState('')


	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)





	console.log(defs);






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








	function reduceStocks(allPoses) {
		return allPoses

			.filter((pos) => pos.sklad === "pogrebi" && isNewerThanThreeYears(pos.date))
			.reduce((result, currentObj) => {


				const existingObj = result.find((obj) => obj.artikul === currentObj.artikul);

				if (existingObj) {
					// Если объект с таким artikul уже есть, обновляем quant
					existingObj.quant += currentObj.quant;
				} else {
					// Если нет, добавляем новый объект
					result.push({ artikul: currentObj.artikul, quant: currentObj.quant, });
				}
				return result;
			}, []);

	}


	function filterStocksByDif(stocks) {
		return stocks
			.filter((stock) => {
				const remainsQuant = remains[stock.artikul];
				return remainsQuant && stock.quant > remainsQuant;
			})
			.map((def) => ({
				...def,
				dif: def.quant - remains[def.artikul],
				remain: remains[def.artikul]
			}));
	}




	async function filterStocksByDifCurrent(stocks) {


		const fetchArtCurrentQuant = async (art) => {
			try {

				const { quant } = getArtDataBtrade(art)
				return quant
			} catch (error) {
				console.log(error);
			}
		}



		return stocks
			.filter((stock) => {

				const regex = /^\d{4}-\d{4}$/;
				const isValid = regex.test(stock.artikul)

				if (!isValid) return false
				if (!remains.hasOwnProperty(stock.artikul)) return false

				const currentQuant = fetchArtCurrentQuant(stock.artikul)

				return currentQuant && stock.quant > currentQuant;

			})

	};






function calculateDefs() {

	const reducedStocks = reduceStocks(allPoses)
	setStocks(reducedStocks)

	const defs = filterStocksByDif(reducedStocks)
	setDefs(defs)
}


async function calculateDefsCurrent() {
	const reducedStocks = reduceStocks(allPoses)
	setStocks(reducedStocks)


}



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












useEffect(() => {
	const fetchPoses = async () => {

		try {
			setIsFetchingPoses(true)
			await getAllPoses()

		} catch (error) {
			console.log(error);

		} finally {
			setIsFetchingPoses(false)
		}
	}

	fetchPoses()

	return async () => {
		await clearPosesStore()
	}
}, [])




useEffect(() => {

	if (allPoses && remains) {
		calculateDefs()
		console.log("Defs is calculated");

	}


}, [allPoses])









return (
	<PageBTW
		className="space-y-4"
	>
		<HeaderBlock
			className="border border-slate-500 shadow-md shadow-slate-500"
		>
			Дефіцити
		</HeaderBlock>



		<CardBlock>
			<ButtonGroup>


				<ButtonBlock
					className="pink-b"
					onClick={() => { }}
				>
					Актуалізація дефіцитів
				</ButtonBlock>

			</ButtonGroup>

		</CardBlock>





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







		{isFetchingPoses
			?
			<CardBlock>
				<Spinner color="fuchsia" />
			</CardBlock>
			:

			<CardBlock
				className="flex flex-col items-start  "

			>

				<TextBlock
					className="text-2xl text-teal-100"
				>
					Позиції всього: {allPoses?.length}
				</TextBlock>
				<TextBlock
					className="text-2xl text-sky-100"
				>
					Артикули: {artsDB?.length}
				</TextBlock>


				{/* <TextBlock>
						Залишки: {remains ? remains["1102-0260"] : null}
					</TextBlock> */}

				<TextBlock
					className="text-2xl text-orange-100"
				>
					Запаси: {stocks?.length}
				</TextBlock>

				<TextBlock
					className="text-2xl text-pink-100"
				>
					Дефіцити: {defs?.length}
				</TextBlock>

			</CardBlock>
		}



		<CardBlock
			className="space-y-2"
		>
			{defs?.map((def, i) =>
				<CardBlock
					key={i}
					className="grid  lg:grid-cols-3 p-2 border border-pink-500 rounded-xl"
				>
					<CardBlock >

						<CardBlock
							className="bg-white flex justify-center "
						>
							<ImageArt size={200} artikul={def.artikul} />

						</CardBlock>


						<TextBlock
							className="p-2 text-xl text-center italic bg-sky-500/20 "
						>
							{artsDB?.find(art => art.artikul === def.artikul)?.nameukr}
						</TextBlock>

					</CardBlock>

					<CardBlock
						className="justify-self-center flex flex-col justify-around p-3"
					>
						<TextBlock
							className="text-2xl text-center"
						> Кількість артикула на запасах: {def?.quant}</TextBlock>
						<TextBlock
							className="text-2xl text-center"
						>
							Дефіцит: {def?.dif}
						</TextBlock>
						<TextBlock
							className="text-2xl text-center"
						>
							Залишок по базі: {def?.remain}
						</TextBlock>

					</CardBlock>


					<CardBlock
						className="flex justify-center items-center"
					>

						<ButtonBlock
							className="indigo-b"
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

		</CardBlock>









	</PageBTW >
)
}
