import React, { useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, InputBlock, ModalConfirm, ModalDelete, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components"


import useAskStore from './stores/asksStore'
import { useNavigate, useParams } from 'react-router-dom'
import usePosesStore from '../Stocks/stores/posesStore'
import useFetchRemains from '../../hooks/useFetchRemains';
import useAuthStore from '../Auth/authStore';
import ArtCard from '../Arts/components/ArtCard';
import ModalUpdateAsk from './components/modals/ModalUpdateAsk';

import { sendMessageToUser } from '../../utils/sendMessagesTelegram'
import useFetchArts from '../../hooks/useFetchArts';

import PosesWithArtikulContainer from '../Arts/components/PosesWithArtikulContainer';
import useFetchAsk from './hooks/useFetchAsk';
import useFetchPosesByArtikul from '../Arts/hooks/useFetchPosesByArtikul';
import AskActions from './components/AskActions'
import AskInfo from './components/AskInfo'



export default function AskPage() {

	const { id } = useParams()
	const navigate = useNavigate()

	const { ask, updateAskById, deleteAskById } = useAskStore()


	const { artsDB } = useFetchArts()
	const artikul = artsDB?.find((art) => art?.artikul === ask?.artikul)
	const { remains } = useFetchRemains()
	const { isLoadingPoses } = useFetchPosesByArtikul(artikul);

	const { isAskLoading, ostatok, artPrice } = useFetchAsk(id)

	const { posesWithArtikul, updatePosWithArtikulById } = usePosesStore();

	const { user, getUserById } = useAuthStore()

	const [selectedPos, setSelectedPos] = useState(null)
	const [finalValuePosBoxes, setFinalValuePosBoxes] = useState(0)
	const [finalValuePosQuant, setFinalValuePosQuant] = useState(0)
	const [askValuePosBoxes, setAskValuePosBoxes] = useState(0)
	const [askValuePosQuant, setAskValuePosQuant] = useState(0)

	const [showModalUpdateAsk, setShowModalUpdateAsk] = useState(false)
	const [showModalDeleteAsk, setShowModalDeleteAsk] = useState(false)
	const [showModalDoAsk, setShowModalDoAsk] = useState(false)
	const [showModalFailAsk, setShowModalFailAsk] = useState(false)

	const [isUpdatingPos, setIsUpdatingPos] = useState(false)
	const [isDeletingAsk, setIsDeletingAsk] = useState(false)
	const [isDoingAsk, setIsDoingAsk] = useState(false)
	const [isFailingAsk, setIsFailingAsk] = useState(false)


	// HANDLERS 

	async function handleAskingPos() {

		try {
			setIsUpdatingPos(true)

			const posUpdateData = {
				boxes: finalValuePosBoxes,
				quant: finalValuePosQuant,

			}

			const askUpdateData = {
				...ask,
				actions: [...ask?.actions, `
				З палети ${selectedPos?.palletTitle} було знято: кульок  ${askValuePosQuant}, 
				коробок ${askValuePosBoxes}
				`]
			}

			console.log(askUpdateData);

			const updatedPos = await updatePosWithArtikulById(selectedPos._id, posUpdateData)
			console.log(updatedPos)


			const updatedAsk = await updateAskById(id, askUpdateData)
			console.log(updatedAsk)


		} catch (error) {
			console.log(error)
		} finally {
			setIsUpdatingPos(false)
			setShowModalUpdateAsk(false)
		}

	}

	async function handleDeleteAsk() {
		try {
			setIsDeletingAsk(true)
			await deleteAskById(id)
			navigate("/asks")
		} catch (error) {
			console.log(error);
		} finally {
			setIsDeletingAsk(false)
			setShowModalDeleteAsk(false)
		}
	}


	async function handleSolveAsk() {
		try {
			setIsDoingAsk(true)

			const askUpdateData = {
				status: "solved",
				solver: user?._id,
				actions: [...ask?.actions, `${user?.fullname} ВИКОНАВ цей запит`]
			}

			const updatedAsk = await updateAskById(id, askUpdateData)

			if (updatedAsk) {
				try {
					const askerUser = await getUserById(updatedAsk?.asker)
					if (askerUser) {
						sendMessageToUser(`${askerUser?.fullname}, твій запит на ${artikul ? artikul?.nameukr : updatedAsk?.artikul} ВИКОНАНО`, askerUser?.telegram)
					}
				} catch (error) {
					console.log(error);
				}
			}

		} catch (error) {
			console.log(error);

		} finally {
			setIsDoingAsk(false)
			setShowModalDoAsk(false)
		}
	}

	async function handleFailAsk() {
		try {
			setIsFailingAsk(true)

			const askUpdateData = {
				status: "fail",
				solver: user?._id,
				actions: [...ask?.actions, `${user?.fullname} ВІДМОВИВ на цей запит`]
			}

			const updatedAsk = await updateAskById(id, askUpdateData)

			if (updatedAsk) {
				try {
					const askerUser = await getUserById(updatedAsk?.asker)
					if (askerUser) {
						sendMessageToUser(`${askerUser?.fullname}, на твій запит на ${artikul ? artikul?.nameukr : updatedAsk?.artikul} було ВІДМОВЛЕНО`, askerUser?.telegram)
					}
				} catch (error) {
					console.log(error);
				} finally {

				}


			}
		} catch (error) {
			console.log(error);

		} finally {

			setIsFailingAsk(false)
			setShowModalFailAsk(false)
		}
	}


	if (isAskLoading) {
		return (
			<PageBTW>
				<HeaderBlock
					className="text-transparent"
				>
					Запит
				</HeaderBlock>
				<ContainerBlock
					className="w-full h-full flex justify-center items-center"
				>
					<Spinner color="rgb(99 102 241 )" />
				</ContainerBlock>

			</PageBTW>
		)
	}




	return (


		<PageBTW
			className="space-y-4 px-1"
		>

			<HeaderBlock
				className="bg-indigo-500 shadow-2xl shadow-indigo-500"
			>

				<TextBlock>Запит на  {ask?.artikul}</TextBlock>

			</HeaderBlock>


			<ButtonGroup>
				<ButtonGroup.Actions>
					<ButtonBlock
						className="green-b"
						onClick={() => setShowModalDoAsk(true)}
					>
						Виконати
					</ButtonBlock>
					<ButtonBlock
						className="rose-b"
						onClick={() => setShowModalFailAsk(true)}
					>
						Відмовити
					</ButtonBlock>
					<ButtonBlock
						className="red-b"
						onClick={() => setShowModalDeleteAsk(true)}
					>
						Видалити
					</ButtonBlock>
				</ButtonGroup.Actions>
			</ButtonGroup>


			{/* MODALS */}





			{showModalDoAsk && <ModalConfirm
				ask="Позначити цей запит виконаним?"
				onCancel={() => setShowModalDoAsk(false)}
				onConfirm={handleSolveAsk}
				isConfirming={isDoingAsk}



			/>}

			{showModalFailAsk && <ModalConfirm
				ask="Відмовити на цей запит?"
				onCancel={() => setShowModalFailAsk(false)}
				onConfirm={handleFailAsk}
				isConfirming={isFailingAsk}


			/>}

			{showModalDeleteAsk && <ModalDelete
				ask="Видалити цей запит на зняття?"
				onCancel={() => setShowModalDeleteAsk(false)}
				onDelete={handleDeleteAsk}
				isDeleting={isDeletingAsk}


			/>}


			<ModalUpdateAsk
				showModalUpdateAsk={showModalUpdateAsk}
				setShowModalUpdateAsk={setShowModalUpdateAsk}
				selectedPos={selectedPos}
				finalValuePosBoxes={finalValuePosBoxes}
				finalValuePosQuant={finalValuePosQuant}
				askValuePosBoxes={askValuePosBoxes}
				askValuePosQuant={askValuePosQuant}
				setAskValuePosBoxes={setAskValuePosBoxes}
				setFinalValuePosBoxes={setFinalValuePosBoxes}
				setAskValuePosQuant={setAskValuePosQuant}
				setFinalValuePosQuant={setFinalValuePosQuant}
				handleAskingPos={handleAskingPos}
				isUpdatingPos={isUpdatingPos}
			/>


			<AskInfo
				ask={ask}
			/>

			<ArtCard
				artikul={artikul}
				remains={remains}
				title={artikul?.artikul}
				ostatok={ostatok}
				posesWithArtikul={posesWithArtikul}
				artPrice={artPrice}

			/>


			<AskActions
				ask={ask}
			/>




			<PosesWithArtikulContainer
				isLoadingPoses={isLoadingPoses}
				posesWithArtikul={posesWithArtikul}
			>
				{posesWithArtikul?.map((pos) =>
					<PosesWithArtikulContainer.PosWithArtikulBage
						key={pos._id}
						pos={pos}
						onClick={() => {
							setShowModalUpdateAsk(true)
							setSelectedPos(pos)
							setFinalValuePosBoxes(pos?.boxes)
							setFinalValuePosQuant(pos?.quant)
							setAskValuePosBoxes(0);
							setAskValuePosQuant(0);

						}}
					/>
				)}
			</PosesWithArtikulContainer>


		</PageBTW >
	)
}
