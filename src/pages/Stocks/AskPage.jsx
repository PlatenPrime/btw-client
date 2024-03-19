import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, InputBlock, ModalConfirm, ModalDelete, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components"
import { BsBalloon, BsBoxSeam } from "react-icons/bs";
import { VscLocation } from "react-icons/vsc";
import { FaWarehouse } from "react-icons/fa6";
import { LiaPalletSolid } from "react-icons/lia";
import { ImMoveDown } from 'react-icons/im'
import useAskStore from './stores/asksStore'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useArtContext } from '../../ArtContext'
import usePosesStore from './stores/posesStore'
import usePalletStore from './stores/palletsStore'
import useFetchRemains from '../../hooks/useFetchRemains';
import { getArtDataBtrade } from '../../utils/getArtDataBtrade';
import useAuthStore from '../Auth/authStore';
import ArtCard from './components/ArtCard';
import UpdateASkModal from './AskPageModals/UpdateAskModal';



export default function AskPage() {


	const { artsDB } = useArtContext()
	const { remains } = useFetchRemains()

	const { id } = useParams()
	const navigate = useNavigate()



	const { getAskById, updateAskById, deleteAskById } = useAskStore()
	const { getPosesByArtikul, posesWithArtikul, updatePosWithArtikulById } = usePosesStore();
	const { pallets, getAllPallets } = usePalletStore();
	const { user, users, getUsers } = useAuthStore()






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
				solver: user?._id
			}

			const updatedAsk = await updateAskById(id, askUpdateData)
			if (updatedAsk) setAsk(updatedAsk)




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
				solver: user?._id
			}

			const updatedAsk = await updateAskById(id, askUpdateData)
			if (updatedAsk) setAsk(updatedAsk)




		} catch (error) {
			console.log(error);

		} finally {

			setIsFailingAsk(false)
			setShowModalFailAsk(false)
		}
	}









	if (isLoadingAsk) return <ContainerBlock
		className="w-full flex justify-center items-center"
	>
		<Spinner color="#6366f1" />
	</ContainerBlock>







	return (






		<PageBTW
			className="space-y-2 px-1"
		>

			<HeaderBlock
				className="bg-indigo-500 shadow-2xl shadow-indigo-500"
			>

				<TextBlock>Запит на  {ask?.artikul}</TextBlock>


			</HeaderBlock>



			<ButtonGroup>

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


			<UpdateASkModal
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

			/>

			<ContainerBlock>
				<TextBlock
					className="text-2xl"
				>
					Історія змін
				</TextBlock>
				<CardBlock
					className="space-y-2 "
				>
					{ask?.actions?.map((action, i) => <TextBlock
						key={i}
						className="bg-indigo-500/10 p-2 text-white rounded-xl italic"

					>
						{action}
					</TextBlock>)}
				</CardBlock>
			</ContainerBlock>


			<ContainerBlock
				className="flex justify-center w-full space-y-4"
			>

				{isLoadingPoses ?
					<Spinner color="rgb(234 179 8 )" />
					:
					posesWithArtikul.length > 0 ?
						<CardBlock
							className="flex flex-col space-y-4 w-full"
						>

							{posesWithArtikul?.map((pos) => {
								return { ...pos, palletTitle: pallets?.find((pallet) => pallet._id === pos?.pallet)?.title }
							})
								.sort((a, b) => b.boxes - a.boxes)
								.map((pos) => <CardBlock
									key={pos._id}
									className={`
											grid grid-cols-1 lg:grid-cols-2 space-y-2  lg:space-y-0 cursor-pointer p-4 lg:gap-8 justify-center
											${pos.sklad === "merezhi" ?
											"bg-yellow-700/20 hover:bg-yellow-700/50  "
											: pos.sklad === "pogrebi"
												? "bg-blue-700/20 hover:bg-blue-700/50 "
												: null} 
											transition ease-in-out duration-300`}
									onClick={() => {
										setShowModalUpdateAsk(true);
										setSelectedPos(pos)
										setFinalValuePosBoxes(pos?.boxes)
										setFinalValuePosQuant(pos?.quant)
										setAskValuePosBoxes(0);
										setAskValuePosQuant(0);
										setSelectedPosPalletTitle(pallets?.find((pallet) => pallet._id === pos?.pallet)?.title)
									}

									}
								>



									<CardBlock
										className={` flex justify-center  lg:justify-start  font-bold    `
										}

									>

										<TextBlock
											className=" text-2xl"
										>
											<LiaPalletSolid />
										</TextBlock>


										<TextBlock
											className="grid place-content-center text-2xl"
										>
											{pos.palletTitle}
										</TextBlock>

									</CardBlock>




									<CardBlock
										className="  grid grid-cols-2  lg:justify-items-start p-1  "
									>

										<CardBlock
											className="flex justify-center space-x-2"
										>
											<TextBlock
												className="text-amber-100  text-xl">
												<BsBoxSeam />
											</TextBlock>
											<TextBlock
												className="text-amber-100 font-bold text-xl "
											>
												{pos?.boxes}
											</TextBlock>
										</CardBlock>


										<CardBlock
											className="flex justify-center  space-x-2"
										>
											<TextBlock
												className="text-sky-100  text-xl">
												<BsBalloon />
											</TextBlock>
											<TextBlock
												className="text-sky-100  font-bold text-xl "
											>

												{pos?.quant}
											</TextBlock>
										</CardBlock>

									</CardBlock>


								</CardBlock>

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



		</PageBTW >
	)
}
