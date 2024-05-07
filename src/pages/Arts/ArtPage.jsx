import { useState } from "react";

import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, InputBlock, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components";

import { Link, useParams } from "react-router-dom";
import usePosesStore from "../Stocks/stores/posesStore";
import usePalletStore from "../Stocks/stores/palletsStore";
import { BsBalloon, BsBoxSeam } from "react-icons/bs";
import useFetchRemains from "../../hooks/useFetchRemains";
import { CancelIcon, OkIcon, PalletIcon } from "../../components/UI/Icons";
import ArtCard from "./components/ArtCard";
import useAskStore from "../Stocks/stores/asksStore";
import useAuthStore from "../Auth/authStore";
import { toast } from "react-toastify";
import useFetchArts from "../../hooks/useFetchArts";
import useFetchArtikulById from "./hooks/useFetchArtikulById";

import { sendMessageToTelegram } from "../../utils/sendMessagesTelegram"
import useFetchPosesByArtikul from "./hooks/useFetchPosesByArtikul";
import useFetchAllPallets from "../Pallets/hooks/useFetchAllPallets";
import useFetchUsers from "../Auth/hooks/useFetchUsers";


export default function ArtPage() {

	const { user, users } = useAuthStore()
	const { id } = useParams()

	const { remains } = useFetchRemains()
	const { artsDB } = useFetchArts()
	const { isLoadingArtikul, artikul, ostatok, artPrice } = useFetchArtikulById(id)
	const { isLoadingPoses } = useFetchPosesByArtikul(artikul);
	const { isLoadingAllPallets } = useFetchAllPallets()
	const { isLoadingUsers } = useFetchUsers()

	const { posesWithArtikul } = usePosesStore();
	const { pallets } = usePalletStore();

	const { createAsk } = useAskStore()


	const [isCreatingAsk, setIsCreatingAsk] = useState(false)
	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [newAskQuant, setNewAskQuant] = useState('')
	const [newAskCom, setNewAskCom] = useState('')


	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)



	// STATES


	const title = artikul?.artikul



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
									<TextBlock className="text-lg"> Скасувати</TextBlock>

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
											<TextBlock className="text-lg"> 	Створити</TextBlock>
										</>

									}

								</ButtonBlock>
							</CardBlock>



						</CardBlock>
					</ModalWrapper>
					}






					<ButtonGroup>

						<ButtonGroup.Actions>
							<ButtonBlock
								className="pink-b"
								onClick={() => {
									setShowModalCreateAsk(true)
									setNewAskArtikul(artikul?.artikul)
								}}
							>
								Створити запит
							</ButtonBlock>
						</ButtonGroup.Actions>

					</ButtonGroup>


					<ArtCard
						artikul={artikul}
						remains={remains}
						title={title}
						ostatok={ostatok}
						posesWithArtikul={posesWithArtikul}
						artPrice={artPrice}

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
