import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, PageBTW, Spinner, TextBlock } from "../../components";

import usePosesStore from "../Poses/stores/posesStore";

import ArtCard from "./components/ArtCard";

import useFetchRemains from "../../hooks/useFetchRemains";
import useFetchArts from "../../hooks/useFetchArts";
import useFetchArtikulById from "./hooks/useFetchArtikulById";
import useFetchPosesByArtikul from "./hooks/useFetchPosesByArtikul";
import useFetchUsers from "../Auth/hooks/useFetchUsers";

import ModalCreateAsk from "../Asks/components/modals/ModalCreateAsk";
import PosesWithArtikulContainer from "./components/PosesWithArtikulContainer";
import { AddIcon } from "../../components/UI/Icons";





export default function ArtPage() {


	const { id } = useParams()
	const navigate = useNavigate()

	const { remains } = useFetchRemains()
	const { artsDB } = useFetchArts()
	const { isLoadingArtikul, artikul, ostatok, artPrice } = useFetchArtikulById(id)
	const { isLoadingPoses } = useFetchPosesByArtikul(artikul);
	const { isLoadingUsers } = useFetchUsers()

	const { posesWithArtikul } = usePosesStore();

	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)





	return (
		<PageBTW
			isLoading={isLoadingArtikul}
			className=""
		>

			<HeaderBlock
				className="bg-sky-500  shadow-sm shadow-sky-500 "
			>
				<TextBlock>Артикул</TextBlock>
			</HeaderBlock>


			<ModalCreateAsk
				artikul={artikul?.artikul}
				showModalCreateAsk={showModalCreateAsk}
				setShowModalCreateAsk={setShowModalCreateAsk}
			/>

			<ButtonGroup>

			<ButtonGroup.Navigation></ButtonGroup.Navigation>


				<ButtonGroup.Actions>
					<ButtonBlock
						className="indigo-b"
						onClick={() => {
							setShowModalCreateAsk(true)
						}}
					>
						<AddIcon />
						Створити запит
					</ButtonBlock>
				</ButtonGroup.Actions>

			</ButtonGroup>


			<ArtCard
				artikul={artikul}
				remains={remains}
				title={artikul?.artikul}
				ostatok={ostatok}
				posesWithArtikul={posesWithArtikul}
				artPrice={artPrice}
			/>


			<PosesWithArtikulContainer
				isLoadingPoses={isLoadingPoses}
				posesWithArtikul={posesWithArtikul}
			>
				{posesWithArtikul?.map((pos) =>
					<PosesWithArtikulContainer.PosWithArtikulBage
						pos={pos}
						onClick={() => navigate(`/rows/pallets/${pos?.pallet}`)}
					/>
				)}
			</PosesWithArtikulContainer>




		</PageBTW>
	)
}
