import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, InputBlock, ModalConfirm, ModalDelete, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components"
import { BsBalloon, BsBoxSeam } from "react-icons/bs";

import { LiaPalletSolid } from "react-icons/lia";

import useAskStore from './stores/asksStore'
import { useNavigate, useParams } from 'react-router-dom'
import usePosesStore from '../Stocks/stores/posesStore'
import usePalletStore from '../Stocks/stores/palletsStore'
import useFetchRemains from '../../hooks/useFetchRemains';
import { getArtDataBtrade } from '../../utils/getArtDataBtrade';
import useAuthStore from '../Auth/authStore';
import ArtCard from '../Arts/components/ArtCard';
import UpdateAskModal from './components/modals/ModalUpdateAsk';

import { sendMessageToUser } from '../../utils/sendMessagesTelegram'
import useFetchArts from '../../hooks/useFetchArts';

import PosesWithArtikulContainer from '../Arts/components/PosesWithArtikulContainer';



export default function AskPage() {


	const { artsDB } = useFetchArts()
	const { remains } = useFetchRemains()


	const artPrice = "В асках нет пока запроса цены"

	const { id } = useParams()
	const navigate = useNavigate()



	const { getAskById, updateAskById, deleteAskById } = useAskStore()
	const { getPosesByArtikul, posesWithArtikul, updatePosWithArtikulById } = usePosesStore();
	const { pallets, getAllPallets } = usePalletStore();
	const { user, users, getUsers, getUserById } = useAuthStore()






	const [ask, setAsk] = useState(null)
	const [newAction, setNewAction] = useState("")
	const [ostatok, setOstatok] = useState(null)




	const [isLoadingPoses, setIsLoadingPoses] = useState(false)
	const [isUpdatingPos, setIsUpdatingPos] = useState(false)
	const [isLoadingAsk, setIsLoadingAsk] = useState(false)
	const [isDeletingAsk, setIsDeletingAsk] = useState(false)
	const [isDoingAsk, setIsDoingAsk] = useState(false)
	const [isFailingAsk, setIsFailingAsk] = useState(false)



	const [selectedPos, setSelectedPos] = useState(null)
	const [selectedPosPalletTitle, setSelectedPosPalletTitle] = useState(null)
	const [finalValuePosBoxes, setFinalValuePosBoxes] = useState(0)
	const [finalValuePosQuant, setFinalValuePosQuant] = useState(0)
	const [askValuePosBoxes, setAskValuePosBoxes] = useState(0)
	const [askValuePosQuant, setAskValuePosQuant] = useState(0)


	const [showModalUpdateAsk, setShowModalUpdateAsk] = useState(false)
	const [showModalDeleteAsk, setShowModalDeleteAsk] = useState(false)
	const [showModalDoAsk, setShowModalDoAsk] = useState(false)
	const [showModalFailAsk, setShowModalFailAsk] = useState(false)


	const artikul = artsDB?.find((art) => art.artikul === ask?.artikul)
	const title = artikul?.artikul

	console.log(ask)

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
				З палети ${selectedPosPalletTitle} було знято: кульок  ${askValuePosQuant}, 
				коробок ${askValuePosBoxes}
				`]
			}

			console.log(askUpdateData);

			const updatedPos = await updatePosWithArtikulById(selectedPos._id, posUpdateData)
			console.log(updatedPos)


			const updatedAsk = await updateAskById(id, askUpdateData)
			console.log(updatedAsk)
			if (updatedAsk) setAsk(updatedAsk)


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


	async function handleDoAsk() {
		try {
			setIsDoingAsk(true)

			const askUpdateData = {
				status: "solved",
				solver: user?._id,
				actions: [...ask?.actions, `${user?.fullname} ВИКОНАВ цей запит`]
			}

			const updatedAsk = await updateAskById(id, askUpdateData)



			if (updatedAsk) {
				setAsk(updatedAsk)

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
				setAsk(updatedAsk)

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





	return (






		<PageBTW
			className="space-y-2 px-1"
		>

			<HeaderBlock
				className="bg-indigo-500 shadow-2xl shadow-indigo-500"
			>

				{ask ?
					<TextBlock>Запит на  {ask?.artikul}</TextBlock>
					:
					<TextBlock className="text-transparent" >Запит</TextBlock>

				}


			</HeaderBlock>


			{isLoadingAsk

				?



				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="rgb(99 102 241 )" />
				</ContainerBlock>

				:

				<>







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
						onConfirm={handleDoAsk}
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


					<UpdateAskModal
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

					<ArtCard
						artikul={artikul}
						remains={remains}
						title={title}
						ostatok={ostatok}
						posesWithArtikul={posesWithArtikul}
						artPrice={artPrice}

					/>

					<ContainerBlock>
						<TextBlock
							className="text-2xl text-green-100"
						>
							Історія змін
						</TextBlock>
						<CardBlock
							className="space-y-2 "
						>
							{ask?.actions?.map((action, i) => <TextBlock
								key={i}
								className="bg-green-500/10 p-2 text-white rounded-xl italic justify-start"

							>
								{i + 1 + ". "}{action}
							</TextBlock>)}
						</CardBlock>
					</ContainerBlock>



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
									setSelectedPosPalletTitle(pallets?.find((pallet) => pallet._id === pos?.pallet)?.title)
								}}
							/>
						)}
					</PosesWithArtikulContainer>




				</>
			}


		</PageBTW >
	)
}