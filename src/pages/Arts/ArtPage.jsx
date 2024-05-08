import { useState } from "react";

import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, Spinner, TextBlock } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import usePosesStore from "../Stocks/stores/posesStore";
import usePalletStore from "../Stocks/stores/palletsStore";
import useFetchRemains from "../../hooks/useFetchRemains";
import ArtCard from "./components/ArtCard";

import { toast } from "react-toastify";
import useFetchArts from "../../hooks/useFetchArts";
import useFetchArtikulById from "./hooks/useFetchArtikulById";
import useFetchPosesByArtikul from "./hooks/useFetchPosesByArtikul";
import useFetchAllPallets from "../Pallets/hooks/useFetchAllPallets";
import useFetchUsers from "../Auth/hooks/useFetchUsers";
import ModalCreateAsk from "../Asks/components/modals/ModalCreateAsk";
import ArtPalletBage from "./components/ArtPalletBage";


export default function ArtPage() {


	const { id } = useParams()
	const navigate = useNavigate()

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








	if (isLoadingArtikul) {
		return (
			<PageBTW>
				<HeaderBlock
					className="text-transparent"
				>
					Артикул
				</HeaderBlock>
				<ContainerBlock
					className="w-full h-full flex justify-center items-center"
				>
					<Spinner color="rgb(14 165 233 )" />
				</ContainerBlock>

			</PageBTW>
		)
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
			
				{isLoadingPoses
					?
					<Spinner color="rgb(245 158 11)" />

					:

					posesWithArtikul.length > 0 ?


						<CardBlock
							className="flex flex-col space-y-2"
						>

							{posesWithArtikul?.map((pos) =>
									

									<ArtPalletBage

										pos={pos}
										onClick={() => navigate(`/pallets/${pos?.pallet}`)}
									/>
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


		</PageBTW>
	)
}
