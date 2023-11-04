import { useEffect, useState } from "react";

import { CardBlock, HeaderBlock, ImageArt, PageBTW, Spinner, TextBlock } from "../../components";
import useArtikulStore from "./stores/artsStore";
import { Link, useParams } from "react-router-dom";
import usePosesStore from "./stores/posesStore";
import usePalletStore from "./stores/palletsStore";
import { BsBalloon, BsBoxSeam } from "react-icons/bs";
import useFetchRemains from "../../hooks/useFetchRemains";


export default function ArtPage() {


	const { remains, loadingRemains, errorRemains } = useFetchRemains()



	const { id } = useParams()
	const getArtikulById = useArtikulStore((state) => state.getArtikulById);

	const getPosesByArtikul = usePosesStore((state) => state.getPosesByArtikul);
	const posesWithArtikul = usePosesStore((state) => state.posesWithArtikul);


	const pallets = usePalletStore((state) => state.pallets);
	const getAllPallets = usePalletStore((state) => state.getAllPallets);




	// STATES

	const [artikul, setArtikul] = useState(null)
	const [isLoadingArtikul, setIsLoadingArtikul] = useState(false)


	const [isLoadingPoses, setIsLoadingPoses] = useState(false)


	const title = artikul?.artikul


	useEffect(() => {


		const fetchArtikul = async () => {
			try {
				setIsLoadingArtikul(true)
				const artikul = await getArtikulById(id)
				setArtikul(artikul)
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
				console.log(posesByArtikul)


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

			<CardBlock
				className="p-1 space-y-2 min-h-screen"
			>

				<CardBlock
					className="flex flex-col lg:flex-row"
				>

					<ImageArt size={100} artikul={artikul?.artikul} />

					<CardBlock
						className="flex flex-col items-start"
					>

						<TextBlock>
							{artikul?.nameukr}
						</TextBlock>
						<TextBlock>
							Зона: {artikul?.zone}
						</TextBlock>
						<TextBlock>
							Остаток по базе: {remains ? remains[title] : ""}
						</TextBlock>

					</CardBlock>

				</CardBlock>



				<CardBlock
					className=" "
				>
					<TextBlock
						className="text-amber-500 text-3xl"
					>
						Палети
					</TextBlock>


					<CardBlock
						className="flex flex-col space-y-2"
					>

						{posesWithArtikul?.map((pos) => <Link
							className='
			flex flex-col lg:flex-row justify-between
				  p-3 rounded text-2xl
				border-2 border-amber-500 
				 bg-transparent  hover:bg-amber-500/20
				text-amber-100 hover:text-white
				 shadow-inner hover:shadow-amber-500
			transition ease-in-out duration-300
			'
							to={`/pallets/${pallets?.find((pallet) => pallet._id === pos?.pallet)?._id}`}
						>
							<TextBlock
								className="w-1/2 flex justify-start"
							> Паллета: {pallets?.find((pallet) => pallet._id === pos?.pallet)?.title}</TextBlock>

							<CardBlock
								className="  w-full flex justify-evenly "
							>



								<CardBlock
									className="flex space-x-2"
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
									className="flex space-x-2"
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


				</CardBlock>





			</CardBlock>

		</PageBTW>
	)
}
