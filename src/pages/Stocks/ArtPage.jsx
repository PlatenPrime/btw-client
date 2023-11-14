import { useEffect, useState } from "react";

import { CardBlock, HeaderBlock, ImageArt, PageBTW, Spinner, TextBlock } from "../../components";
import useArtikulStore from "./stores/artsStore";
import { Link, useParams } from "react-router-dom";
import usePosesStore from "./stores/posesStore";
import usePalletStore from "./stores/palletsStore";
import { BsBalloon, BsBoxSeam } from "react-icons/bs";
import useFetchRemains from "../../hooks/useFetchRemains";
import { VscLocation } from "react-icons/vsc";
import { FaWarehouse } from "react-icons/fa6";
import { getArtDataBtrade } from "../../utils/getArtDataBtrade";
import { PalletIcon } from "../../components/UI/Icons";


export default function ArtPage() {


	const { remains } = useFetchRemains()



	const { id } = useParams()
	const getArtikulById = useArtikulStore((state) => state.getArtikulById);

	const getPosesByArtikul = usePosesStore((state) => state.getPosesByArtikul);
	const posesWithArtikul = usePosesStore((state) => state.posesWithArtikul);


	const pallets = usePalletStore((state) => state.pallets);
	const getAllPallets = usePalletStore((state) => state.getAllPallets);






	// STATES

	const [artikul, setArtikul] = useState(null)
	const [isLoadingArtikul, setIsLoadingArtikul] = useState(false)
	const [ostatok, setOstatok] = useState(null)


	const [isLoadingPoses, setIsLoadingPoses] = useState(false)


	const title = artikul?.artikul


	useEffect(() => {


		const fetchArtikul = async () => {
			try {
				setIsLoadingArtikul(true)
				const artikul = await getArtikulById(id)
				const { quant: ostatok } = await getArtDataBtrade(artikul?.artikul)
				setArtikul(artikul)
				setOstatok(ostatok)
			} catch (error) {
				console.log(error)
			} finally {
				setIsLoadingArtikul(false)
			}

		}

		fetchArtikul()

	}, [id])


	useEffect(() => {


		const fetchPosesByArtikul = async () => {
			try {
				setIsLoadingPoses(true)
				const posesByArtikul = await getPosesByArtikul(artikul?.artikul)

			} catch (error) {
				console.log(error)
			} finally {
				setIsLoadingPoses(false)
			}

		}

		fetchPosesByArtikul()

	}, [artikul])



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
			className="space-y-4"
		>

			<HeaderBlock
				className="border border-white shadow-md shadow-white"
			>
				{isLoadingArtikul ? <Spinner color="white" /> : <>{artikul?.artikul}</>}
			</HeaderBlock>


			{isLoadingArtikul ? <Spinner color="white" /> : <CardBlock
				className="p-1 space-y-2 min-h-screen"
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
					className="space-y-2 "
				>
					<TextBlock
						className="text-amber-500 text-3xl"
					>
						Палети
					</TextBlock>


					{isLoadingPoses ?
						<Spinner color="rgb(245 158 11)" />
						:

						posesWithArtikul.length > 0 ?


							<CardBlock
								className="flex flex-col space-y-2"
							>

								{posesWithArtikul?.map((pos) => <Link
									className='
			flex flex-col lg:flex-row justify-between
				  p-4 rounded text-2xl space-y-2 lg:space-y-0
				border-2 border-amber-500 
				 bg-transparent  hover:bg-amber-500/20
				text-amber-100 hover:text-white
				 shadow-inner hover:shadow-amber-500
			transition ease-in-out duration-300
			'
									to={`/pallets/${pallets?.find((pallet) => pallet._id === pos?.pallet)?._id}`}
								>
									<TextBlock
										className="lg:w-1/2 flex  lg:justify-start"
									>
										<PalletIcon />
										<TextBlock>
											{pallets?.find((pallet) => pallet._id === pos?.pallet)?.title}
										</TextBlock>
									</TextBlock>






									<CardBlock
										className="  w-full flex justify-between "
									>

										<CardBlock
											className="flex justify-center w-1/2 space-x-2"
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
											className="flex justify-center w-1/2 space-x-2"
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





								</Link>
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





			</CardBlock>}

		</PageBTW>
	)
}
