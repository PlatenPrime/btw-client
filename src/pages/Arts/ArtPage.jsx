import { useEffect, useState } from "react";

import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, InputBlock, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components";
import useArtikulStore from "./stores/artsStore";
import { Link, useParams } from "react-router-dom";
import usePosesStore from "../Stocks/stores/posesStore";
import usePalletStore from "../Stocks/stores/palletsStore";
import { BsBalloon, BsBoxSeam } from "react-icons/bs";
import useFetchRemains from "../../hooks/useFetchRemains";
import { getArtDataBtrade } from "../../utils/getArtDataBtrade";
import { CancelIcon, OkIcon, PalletIcon } from "../../components/UI/Icons";
import ArtCard from "../Stocks/components/ArtCard";
import useAskStore from "../Stocks/stores/asksStore";
import useAuthStore from "../Auth/authStore";
import { toast } from "react-toastify";
import useFetchArts from "../../hooks/useFetchArts";

import { sendMessageToTelegram } from "../../utils/sendMessagesTelegram"


export default function ArtPage() {


	const { remains } = useFetchRemains()
	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()

	const { user, users, getUsers } = useAuthStore()



	const { id } = useParams()
	const getArtikulById = useArtikulStore((state) => state.getArtikulById);

	const getPosesByArtikul = usePosesStore((state) => state.getPosesByArtikul);
	const posesWithArtikul = usePosesStore((state) => state.posesWithArtikul);


	const pallets = usePalletStore((state) => state.pallets);
	const getAllPallets = usePalletStore((state) => state.getAllPallets);

	const { createAsk } = useAskStore()
	const [isCreatingAsk, setIsCreatingAsk] = useState(false)
	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [newAskQuant, setNewAskQuant] = useState('')
	const [newAskCom, setNewAskCom] = useState('')


	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)



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
				await getUsers()

			} catch (error) {
				console.log(error)
			} finally {

			}
		}


		fetchPallets()

	}, [])




	async function handleCreateAsk(newAskData) {
		try {

			setIsCreatingAsk(true)

			const createdAsk = await createAsk(newAskData)

			console.log("Created Ask: ", createdAsk);

			const user = users?.find(user => user._id === createdAsk?.asker)
			const artikul = createdAsk?.artikul
			const quant = createdAsk?.quant
			const com = createdAsk?.com


			if (user?.role !== "PRIME") 
			await sendMessageToTelegram(`
			${user?.fullname}: необхідно зняти ${artikul}.
			${quant ? `Кількість: ${quant} шт` : ""}
			${com ? `Коментарій: ${com}` : ""}
			`)



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






	return (
		<PageBTW
			className="space-y-4 px-1"
		>

			<HeaderBlock
				className="bg-sky-500  shadow-2xl shadow-sky-500 "
			>
				<TextBlock>Артикул</TextBlock>
			</HeaderBlock>












			{isLoadingArtikul
				?
				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="#72a5e9" />
				</ContainerBlock>
				:
				<CardBlock
					className="space-y-2 min-h-screen"
				>



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
									onClick={() => handleCreateAsk({
										artikul: newAskArtikul,
										quant: newAskQuant,
										status: "new",
										com: newAskCom,
										asker: user?._id
									})}
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






					<ButtonGroup>
						<ButtonBlock
							className="pink-b"
							onClick={() => {
								setShowModalCreateAsk(true)
								setNewAskArtikul(artikul?.artikul)
							}}
						>
							Створити запит
						</ButtonBlock>
					</ButtonGroup>


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
										grid grid-cols-1 lg:grid-cols-2 space-y-2  lg:space-y-0 cursor-pointer p-4 lg:gap-8 justify-center rounded-xl
										${pos?.quant === 0 ? "bg-gray-700 hover:bg-gray-500 " : pos.sklad === "merezhi" ?
												"bg-yellow-700/20 hover:bg-yellow-700/50  "
												: pos.sklad === "pogrebi"
													? "bg-blue-700/20 hover:bg-blue-700/50 "
													: null} 
										transition ease-in-out duration-300`}
										to={`/pallets/${pallets?.find((pallet) => pallet._id === pos?.pallet)?._id}`}
										key={pos._id}
									>
										<TextBlock
											className="lg:w-1/2 flex  lg:justify-start text-2xl"
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
									className="text-amber-100 text-xl italic"
								>
									Позиції немає на запасах
								</TextBlock>


						}

					</ContainerBlock>





				</CardBlock>}

		</PageBTW>
	)
}
