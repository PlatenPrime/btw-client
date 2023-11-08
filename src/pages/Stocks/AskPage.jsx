import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, ImageArt, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components"
import { BsBalloon, BsBoxSeam } from "react-icons/bs";
import { VscLocation } from "react-icons/vsc";
import { FaWarehouse } from "react-icons/fa6";
import useAskStore from './stores/asksStore'
import { Link, useParams } from 'react-router-dom'
import { useArtContext } from '../../ArtContext'
import usePosesStore from './stores/posesStore'
import usePalletStore from './stores/palletsStore'
import useFetchRemains from '../../hooks/useFetchRemains';
import { getArtDataBtrade } from '../../utils/getArtDataBtrade';



export default function AskPage() {


	const { artsDB } = useArtContext()

	const { remains } = useFetchRemains()

	const { id } = useParams()


	const getAskById = useAskStore((state) => state.getAskById)

	const getPosesByArtikul = usePosesStore((state) => state.getPosesByArtikul);
	const posesWithArtikul = usePosesStore((state) => state.posesWithArtikul);
	console.log(posesWithArtikul)

	const pallets = usePalletStore((state) => state.pallets);
	const getAllPallets = usePalletStore((state) => state.getAllPallets);


	const [ask, setAsk] = useState(null)
	const [isLoadingPoses, setIsLoadingPoses] = useState(false)
	const [ostatok, setOstatok] = useState(null)
	const [isLoadingAsk, setIsLoadingAsk] = useState(false)


	const artikul = artsDB?.find((art) => art.artikul === ask?.artikul)
	const title = artikul?.artikul


	useEffect(() => {


		const fetchAsk = async () => {

			try {

				setIsLoadingAsk(true)
				const ask = await getAskById(id)
				const { quant: ostatok } = await getArtDataBtrade(ask?.artikul)
				setAsk(ask)
				setOstatok(ostatok)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoadingAsk(false)
			}

		}


		fetchAsk()

		return () => { }
	}, [id])




	useEffect(() => {


		const fetchPosesByArtikul = async () => {
			try {
				setIsLoadingPoses(true)
				const posesByArtikul = await getPosesByArtikul(ask?.artikul)

			} catch (error) {
				console.log(error)
			} finally {
				setIsLoadingPoses(false)
			}

		}

		fetchPosesByArtikul()

	}, [ask])



	useEffect(() => {


		const fetchPallets = async () => {
			try {

				const pallets = await getAllPallets()
				console.log(pallets)


			} catch (error) {
				console.log(error)
			} finally {

			}
		}


		fetchPallets()

	}, [])




	return (
		<PageBTW
			className="space-y-2"
		>

			<HeaderBlock
				className="border border-yellow-500 shadow-md shadow-yellow-500 "
			>

				{isLoadingAsk ? <Spinner color="yellow" /> : <TextBlock>Запит на  {ask?.artikul}</TextBlock>
				}

			</HeaderBlock>




			{isLoadingAsk ? <Spinner color="yellow" /> :
				<CardBlock
					className="w-full space-y-2"
				>


					<CardBlock
						className="flex flex-col lg:flex-row lg:justify-start space-y-2 lg:space-x-2 border"
					>

						<CardBlock
							className="w-full lg:w-fit flex justify-center items-start lg:justify-start"
						>

							<ImageArt size={200} artikul={artikul?.artikul} />
						</CardBlock>

						<CardBlock
							className="flex flex-col items-center space-y-2"
						>

							<TextBlock
								className="text-2xl  lg:text-4xl p-1 justify-center lg:text-left"
							>
								{artikul?.nameukr}
							</TextBlock>


							<CardBlock
								className="w-full flex items-center flex-col lg:flex-row lg:space-x-2 p-1"
							>

								<TextBlock className="  text-3xl font-bold  p-1 rounded text-orange-300" ><VscLocation />{artikul?.zone}</TextBlock>


								<CardBlock
									className="flex space-x-2"
								>
									<TextBlock

										className="text-rose-300  text-3xl"
									>

										<BsBalloon />
									</TextBlock>
									<TextBlock
										className="text-rose-300  font-bold text-3xl  rounded"

									>

										{remains ? remains[title] : ""}
									</TextBlock>
								</CardBlock>



								<CardBlock
									className="flex space-x-2"
								>
									<TextBlock
										className="text-green-300  text-3xl">
										<BsBalloon />
									</TextBlock>
									<TextBlock
										className="text-green-300  font-bold text-3xl  rounded"
									>

										{ostatok}
									</TextBlock>
								</CardBlock>


								<CardBlock
									className="flex space-x-2"
								>
									<TextBlock
										className="text-blue-300  text-3xl">
										<FaWarehouse />
									</TextBlock>

									<TextBlock
										className="text-blue-300  text-3xl">
									
										{posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)}

									</TextBlock>
								</CardBlock>




							</CardBlock>


						</CardBlock>

					</CardBlock>







					<CardBlock
						className="flex justify-center w-full space-y-2"
					>

						{isLoadingPoses ?
							<Spinner color="rgb(234 179 8 )" />
							:

							posesWithArtikul.length > 0 ?


								<CardBlock
									className="flex flex-col space-y-2 w-full"
								>

									{posesWithArtikul?.map((pos) => <CardBlock
										className='
	grid grid-cols-1 lg:grid-cols-3 space-y-2 lg:space-y-0
p-2 border


			transition ease-in-out duration-300
			'

									>
										<TextBlock
											className="lg:min-w-1/3 text-xl justify-items-start"
										>
											Палета: {pallets?.find((pallet) => pallet._id === pos?.pallet)?.title}
										</TextBlock>



										<CardBlock
											className="  grid grid-cols-2  lg:justify-items-start  "
										>

											<CardBlock
												className="flex justify-center space-x-2"
											>
												<TextBlock
													className="text-amber-300  text-3xl">
													<BsBoxSeam />
												</TextBlock>
												<TextBlock
													className="text-amber-300 font-bold text-2xl rounded"
												>
													{pos?.boxes}
												</TextBlock>
											</CardBlock>


											<CardBlock
												className="flex justify-center  space-x-2"
											>
												<TextBlock
													className="text-sky-300  text-3xl">
													<BsBalloon />
												</TextBlock>
												<TextBlock
													className="text-sky-300  font-bold text-2xl  rounded"
												>

													{pos?.quant}
												</TextBlock>
											</CardBlock>



										</CardBlock>

										<CardBlock>
											Кнопки управления
										</CardBlock>



									</CardBlock>
									)}
								</CardBlock>
								:
								<TextBlock
									className="text-amber-500 text-xl"
								>
									Позиції немає на запасах
								</TextBlock>


						}



					</CardBlock>

					<CardBlock
						className="flex justify-center"
					>

						Кнопки подтвердить выполнение запроса

					</CardBlock>



				</CardBlock>}


		</PageBTW>
	)
}
