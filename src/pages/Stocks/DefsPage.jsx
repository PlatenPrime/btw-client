import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, ImageArt, ImageBlock, InputBlock, ModalWrapper, PageBTW, Spinner, TextBlock } from '../../components'
import { Link } from 'react-router-dom'
import useFetchRemains from '../../hooks/useFetchRemains'
import useFetchArts from '../../hooks/useFetchArts'
import usePosesStore from './stores/posesStore'
import useAskStore from './stores/asksStore'
import useAuthStore from '../Auth/authStore'
import { toast } from 'react-toastify'

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


	const calculateDefs = () => {
		const transformedArray = allPoses

			.filter((pos) => pos.sklad === "pogrebi")
			.reduce((result, currentObj) => {


				const existingObj = result.find((obj) => obj.artikul === currentObj.artikul);

				if (existingObj) {
					// Если объект с таким artikul уже есть, обновляем quant
					existingObj.quant += currentObj.quant;
				} else {
					// Если нет, добавляем новый объект
					result.push({ artikul: currentObj.artikul, quant: currentObj.quant });
				}
				return result;
			}, []);


		setStocks(transformedArray)


		const filteredArray = transformedArray
			.filter((obj) => {
				const remainsQuant = remains[obj.artikul];
				return remainsQuant && obj.quant > remainsQuant;
			})
			.map((obj) => ({
				...obj,
				dif: obj.quant - remains[obj.artikul],
			}));

		setDefs(filteredArray)
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

		if (allPoses && remains) { calculateDefs() }
		return async () => {
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
						className="indigo-b "
					>
						<Link
							to="/asks"
						>
							Запити
						</Link>
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
				<Spinner color="fuchsia" />
				:

				<CardBlock>

					<TextBlock>
						Позицій всього: {allPoses?.length}
					</TextBlock>
					<TextBlock>
						Артикулів: {artsDB?.length}
					</TextBlock>


					{/* <TextBlock>
						Залишки: {remains ? remains["1102-0260"] : null}
					</TextBlock> */}

					<TextBlock>
						Запаси: {stocks?.length}
					</TextBlock>

					<TextBlock>
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
						className="grid grid-cols-3 p-2 border border-pink-500 rounded-xl"
					>
						<CardBlock >
							<TextBlock>
								Артикул:	{def.artikul}
							</TextBlock>
							<ImageArt size={80} artikul={def.artikul} />
							<TextBlock>
								{artsDB?.find(art => art.artikul === def.artikul)?.nameukr}
							</TextBlock>
							<TextBlock> Кількість артикула на запасах {def.quant}</TextBlock>
						</CardBlock>

						<CardBlock
							className="justify-self-center"
						>Дефіцит: {def.dif}</CardBlock>


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
