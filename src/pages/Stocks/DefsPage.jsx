import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, PageBTW, Spinner, TextBlock } from '../../components'
import { Link } from 'react-router-dom'
import useFetchRemains from '../../hooks/useFetchRemains'
import useFetchArts from '../../hooks/useFetchArts'
import usePosesStore from './stores/posesStore'

export default function DefsPage() {




	const { remains, loadingRemains, errorRemains } = useFetchRemains()
	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()

	const { poses, getAllPoses, clearPosesStore } = usePosesStore()


	const [isFetchingPoses, setIsFetchingPoses] = useState(false)
	const [stocks, setStocks] = useState(null)
	const [defs, setDefs] = useState(null)



	const calculateDefs = () => {
		const transformedArray = poses.reduce((result, currentObj) => {


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

		if (poses) { calculateDefs() }
		return async () => {
		}

	}, [poses])









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




				</ButtonGroup>

			</CardBlock>


			{isFetchingPoses
				?
				<Spinner color="fuchsia" />
				:

				<CardBlock>

					<TextBlock>
						Позицій: {poses?.length}
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
						Дифіцити: {defs?.length}
					</TextBlock>

				</CardBlock>
			}



			<CardBlock
				className="space-y-2"
			>
				{defs?.map(def =>
					<CardBlock
						className="grid grid-cols-3 p-2 border border-pink-500 rounded-xl"
					>
						<CardBlock >

							Art Card
						</CardBlock>
						<CardBlock>{def.dif}</CardBlock>
						<ButtonBlock
							className="indigo-b"
						>
							Створити запит
						</ButtonBlock>

					</CardBlock>
				)}

			</CardBlock>









		</PageBTW >
	)
}
