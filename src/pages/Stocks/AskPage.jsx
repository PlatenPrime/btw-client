import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, HeaderBlock, ImageArt, InputBlock, ModalConfirm, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components"
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
			setAsk(updatedAsk)




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
			setAsk(updatedAsk)




		} catch (error) {
			console.log(error);

		} finally {

			setIsFailingAsk(false)
			setShowModalFailAsk(false)
		}
	}

















	return (
		<PageBTW
			className="space-y-2"
		>

			<HeaderBlock
				className="border border-indigo-500 shadow-md shadow-indigo-500 "
			>

				{isLoadingAsk ? <Spinner color="#6366f1" /> : <TextBlock>Запит на  {ask?.artikul}</TextBlock>
				}

			</HeaderBlock>



			<ButtonGroup>
				<ButtonBlock
					className="red-b"
					onClick={() => setShowModalDeleteAsk(true)}
				>
					Видалити запит
				</ButtonBlock>
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
					Позначити невиконаним
				</ButtonBlock>
			</ButtonGroup>


			{/* MODALS */}



			{showModalDeleteAsk && <ModalConfirm
				ask="Видалити цей запит на зняття?"
				onCancel={() => setShowModalDeleteAsk(false)}
				onConfirm={handleDeleteAsk}


			/>}

			{showModalDoAsk && <ModalConfirm
				ask="Позначити цей запит виконаним?"
				onCancel={() => setShowModalDoAsk(false)}
				onConfirm={handleDoAsk}


			/>}

			{showModalFailAsk && <ModalConfirm
				ask="Позначити цей запит невиконаним?"
				onCancel={() => setShowModalFailAsk(false)}
				onConfirm={handleFailAsk}


			/>}




			{showModalUpdateAsk && <ModalWrapper
				onCancel={() => setShowModalUpdateAsk(false)}
				title="Зняття позицій"

			>
				<CardBlock
					className="space-y-4 border p-3"
				>




					<CardBlock
						className="flex justify-center  font-bold "
					>

						<TextBlock
							className="text-indigo-300 text-3xl"
						>
							<LiaPalletSolid />
						</TextBlock>


						<TextBlock
							className="lg:min-w-1/3 text-3xl  lg:justify-items-start items-center text-indigo-300"
						>
							{pallets?.find((pallet) => pallet._id === selectedPos?.pallet)?.title}
						</TextBlock>

					</CardBlock>


					<CardBlock
						className="flex space-x-2"
					>
						<TextBlock
							className="text-2xl"
						>
							Зараз:
						</TextBlock>
						<CardBlock
							className="flex justify-center  space-x-2"
						>
							<TextBlock
								className="text-amber-300  text-3xl">
								<BsBoxSeam />
							</TextBlock>
							<TextBlock
								className="text-amber-300 font-bold text-2xl rounded"
							>
								{selectedPos?.boxes}
							</TextBlock>
						</CardBlock>


						<CardBlock
							className="flex justify-center  space-x-2"
						>
							<TextBlock
								className="text-sky-300  text-3xl">
								<BsBalloon />
							</TextBlock>
							<TextBlock
								className="text-sky-300  font-bold text-2xl  rounded"
							>

								{selectedPos?.quant}
							</TextBlock>
						</CardBlock>


					</CardBlock>


					<CardBlock
						className="flex space-x-2"
					>
						<TextBlock
							className="text-2xl "
						>
							Стане:
						</TextBlock>
						<CardBlock
							className="flex justify-center  space-x-2"
						>
							<TextBlock
								className={finalValuePosBoxes < 0 ? "text-red-600  text-3xl" : "text-teal-300  text-3xl"}>


								<BsBoxSeam />
							</TextBlock>
							<TextBlock

								className={finalValuePosBoxes < 0 ? "text-red-600  text-2xl" : "text-teal-300  text-2xl"}>

								{finalValuePosBoxes}
							</TextBlock>
						</CardBlock>


						<CardBlock
							className="flex justify-center  space-x-2"
						>
							<TextBlock
								className={finalValuePosQuant < 0 ? "text-red-600  text-3xl" : "text-teal-300  text-3xl"}>
								<BsBalloon />
							</TextBlock>
							<TextBlock
								className={finalValuePosQuant < 0 ? "text-red-600  text-2xl" : "text-teal-300  text-2xl"}
							>

								{finalValuePosQuant}
							</TextBlock>
						</CardBlock>


					</CardBlock>


					<CardBlock>

						{finalValuePosBoxes < 0 && <TextBlock
							className="border border-red-600 text-red-600 p-2 rounded"
						>
							Коробки в мінусі
						</TextBlock>}

					</CardBlock>

					<CardBlock>

						{finalValuePosQuant < 0 && <TextBlock
							className="border border-red-600 text-red-600 p-2 rounded"
						>
							Недостатньо позиції
						</TextBlock>}

					</CardBlock>



					<CardBlock
						className="space-y-2"

					>


						<CardBlock className="flex justify-between items-center space-x-4">
							<TextBlock
								className="text-cyan-500  text-3xl">
								<BsBoxSeam />
							</TextBlock>
							<InputBlock
								type="number"
								id="quant"
								name="quant"
								autoComplete="off"
								value={askValuePosBoxes}
								onChange={(e) => {
									setAskValuePosBoxes(e.target.value)
									setFinalValuePosBoxes(selectedPos?.boxes - e.target.value)
								}}
							/>
						</CardBlock>




						<CardBlock className="flex justify-between items-center space-x-4">
							<TextBlock
								className="text-cyan-500   text-3xl">
								<BsBalloon />
							</TextBlock>
							<InputBlock
								type="number"
								id="quant"
								name="quant"
								autoComplete="off"
								value={askValuePosQuant}
								onChange={(e) => {
									setAskValuePosQuant(e.target.value)
									setFinalValuePosQuant(selectedPos?.quant - e.target.value)
								}}
							/>
						</CardBlock>




					</CardBlock>





					<CardBlock
						className="grid grid-cols-2 space-x-2"
					>

						<ButtonBlock
							className="red-b"
							onClick={() => setShowModalUpdateAsk(false)}
						>
							Скасувати
						</ButtonBlock>

						<ButtonBlock
							className="green-b"
							disabled={finalValuePosQuant < 0 ||
								finalValuePosBoxes < 0 ||
								askValuePosQuant <= 0 ||
								askValuePosBoxes < 0
							}
							onClick={handleAskingPos}
						>


							{isUpdatingPos ?
								<CardBlock>
									<Spinner color="" />
								</CardBlock>
								:
								<TextBlock>
									Зняти
								</TextBlock>}


						</ButtonBlock>



					</CardBlock>








				</CardBlock>
			</ModalWrapper>}











			{isLoadingAsk ? <Spinner color="indigo" /> :
				<CardBlock
					className="w-full space-y-8 p-4"
				>

					<TextBlock
						className=""
					>
						{ask?.status === "new"
							?
							"Новий"
							: ask?.status === "solved"
								? "Виконано"
								: ask?.status === "fail"
									? "Відмовлено"
									: null
						}
					</TextBlock>

					<CardBlock
						className="flex flex-col lg:flex-row lg:justify-start space-y-2 lg:space-x-2 border"
					>

						<CardBlock
							className="w-full lg:w-fit flex justify-center items-start lg:justify-start"
						>

							<ImageArt size={200} artikul={artikul?.artikul} />
						</CardBlock>

						<CardBlock
							className="flex flex-col items-center space-y-2"
						>

							<TextBlock
								className="text-2xl  lg:text-4xl p-1 justify-center lg:text-left"
							>
								{artikul?.nameukr}
							</TextBlock>


							<CardBlock
								className="w-full flex items-center flex-col lg:flex-row lg:space-x-4 p-1"
							>

								<TextBlock className="  text-3xl font-bold  p-1 rounded text-orange-300" ><VscLocation />{artikul?.zone}</TextBlock>


								<CardBlock
									className="flex"
								>
									<TextBlock

										className="text-rose-300  text-3xl"
									>

										<BsBalloon />
									</TextBlock>
									<TextBlock
										className="text-rose-300  font-bold text-3xl  rounded"

									>

										{remains ? remains[title] : ""}
									</TextBlock>
								</CardBlock>



								<CardBlock
									className="flex "
								>
									<TextBlock
										className="text-green-300  text-3xl">
										<BsBalloon />
									</TextBlock>
									<TextBlock
										className="text-green-300  font-bold text-3xl  rounded"
									>

										{ostatok}
									</TextBlock>
								</CardBlock>


								<CardBlock
									className="flex items-center "
								>
									<TextBlock
										className="text-blue-300  text-3xl">
										<FaWarehouse />
									</TextBlock>

									<TextBlock
										className="text-blue-300 font-bold   text-3xl">

										{posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)}

									</TextBlock>
								</CardBlock>




							</CardBlock>


						</CardBlock>

					</CardBlock>







					<CardBlock
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
											className='
											grid grid-cols-1 lg:grid-cols-3 space-y-2  lg:space-y-0
											p-4 lg:gap-8
											justify-center
											bg-sky-900/20 hover:bg-sky-900/40
											transition ease-in-out duration-300
			'
										>



											<CardBlock
												className={` flex justify-center  lg:justify-start  font-bold ${pos.sklad === "merezhi" ? "bg-indigo-300/90" : pos.sklad === "pogrebi" ? "bg-green-300/90" : null}   `}
											>

												<TextBlock
													className="text-black text-5xl"
												>
													<LiaPalletSolid />
												</TextBlock>


												<TextBlock
													className="grid place-content-center text-black text-4xl"
												>
													{pos.palletTitle}
												</TextBlock>

											</CardBlock>




											<CardBlock
												className="  grid grid-cols-2  lg:justify-items-start border p-1 bg-slate-900 "
											>

												<CardBlock
													className="flex justify-center space-x-2"
												>
													<TextBlock
														className="text-amber-300  text-3xl">
														<BsBoxSeam />
													</TextBlock>
													<TextBlock
														className="text-amber-300 font-bold text-3xl "
													>
														{pos?.boxes}
													</TextBlock>
												</CardBlock>


												<CardBlock
													className="flex justify-center  space-x-2"
												>
													<TextBlock
														className="text-sky-300  text-3xl">
														<BsBalloon />
													</TextBlock>
													<TextBlock
														className="text-sky-300  font-bold text-3xl "
													>

														{pos?.quant}
													</TextBlock>
												</CardBlock>

											</CardBlock>



											<CardBlock
												className="justify-self-end w-full lg:w-fit "
											>
												<ButtonBlock
													className=" blue-b flex text-3xl w-full lg:w-fit  "
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
													<ImMoveDown />
													<TextBlock
														className="text-2xl"
													>Зняти</TextBlock>
												</ButtonBlock>
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

					</CardBlock>




					<CardBlock>
						<TextBlock
							className="text-3xl"
						>
							Історія змін
						</TextBlock>
						<CardBlock
							className="space-y-2"
						>
							{ask?.actions?.map((action, i) => <TextBlock
								key={i}
								className="border border-green-700 p-2 text-green-200 rounded"

							>
								{action}
							</TextBlock>)}
						</CardBlock>
					</CardBlock>




				</CardBlock>}


		</PageBTW >
	)
}
