import { useEffect, useState } from "react";

import { CardBlock, ContainerBlock, HeaderBlock, ImageArt, PageBTW, Spinner, TextBlock } from "../../components";
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
import ArtCard from "./components/ArtCard";


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

			} catch (error) {
				console.log(error)
			} finally {

			}
		}


		fetchPallets()

	}, [])









	return (
		<PageBTW
			className="space-y-4 px-1"
		>

			<HeaderBlock
				className="bg-sky-500  shadow-2xl shadow-sky-500 "
			>
				{isLoadingArtikul ? <Spinner color="white" /> : <>{artikul?.artikul}</>}
			</HeaderBlock>












			{isLoadingArtikul
				?
				<Spinner color="white" />
				:
				<CardBlock
					className="space-y-2 min-h-screen"
				>


					<ArtCard
						artikul={artikul}
						remains={remains}
						title={title}
						ostatok={ostatok}
						posesWithArtikul={posesWithArtikul}

					/>





					<ContainerBlock
						className="space-y-2 "
					>
						<TextBlock
							className="text-amber-100 text-3xl"
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
										className={`
										grid grid-cols-1 lg:grid-cols-2 space-y-2  lg:space-y-0 cursor-pointer p-4 lg:gap-8 justify-center
										${pos.sklad === "merezhi" ?
												"bg-yellow-700/20 hover:bg-yellow-700/50  "
												: pos.sklad === "pogrebi"
													? "bg-blue-700/20 hover:bg-blue-700/50 "
													: null} 
										transition ease-in-out duration-300`}
										to={`/pallets/${pallets?.find((pallet) => pallet._id === pos?.pallet)?._id}`}
										key={pos._id}
									>
										<TextBlock
											className="lg:w-1/2 flex  lg:justify-start"
										>
											<PalletIcon />
											<TextBlock>
												{pos?.palletTitle}
											</TextBlock>
										</TextBlock>






										<CardBlock
											className="  w-full flex justify-between "
										>

											<CardBlock
												className="flex justify-center w-1/2 space-x-2"
											>
												<TextBlock
													className="text-amber-100  text-xl">
													<BsBoxSeam />
												</TextBlock>
												<TextBlock
													className="text-amber-100 font-bold text-xl rounded"
												>
													{pos?.boxes}
												</TextBlock>
											</CardBlock>


											<CardBlock
												className="flex justify-center w-1/2 space-x-2"
											>
												<TextBlock
													className="text-sky-100  text-xl">
													<BsBalloon />
												</TextBlock>
												<TextBlock
													className="text-sky-100  font-bold text-xl  rounded"
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

					</ContainerBlock>





				</CardBlock>}

		</PageBTW>
	)
}
