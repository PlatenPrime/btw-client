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
import ModalCreateAsk from "../Asks/components/modals/ModalCreateAsk";


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



	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)
	const title = artikul?.artikul



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

					<ModalCreateAsk
						artikul={title}
						showModalCreateAsk={showModalCreateAsk}
						setShowModalCreateAsk={setShowModalCreateAsk}
					/>

					<ButtonGroup>

						<ButtonGroup.Actions>
							<ButtonBlock
								className="pink-b"
								onClick={() => {
									setShowModalCreateAsk(true)
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
