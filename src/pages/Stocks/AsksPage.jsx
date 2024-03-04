import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, InputBlock, ModalConfirm, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components"
import useAskStore from './stores/asksStore'
import useAuthStore from "../Auth/authStore"
import { useArtContext } from '../../ArtContext';
import { Link } from 'react-router-dom';
import { AddIcon, CancelIcon, OkIcon } from '../../components/UI/Icons';



export default function AsksPage() {


	const { artsDB, loadingArtsDB, errorArtsDB } = useArtContext()


	const { asks, getAllAsks, createAsk } = useAskStore()
	const { user, users, getUsers } = useAuthStore()





	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [newAskQuant, setNewAskQuant] = useState('')
	const [newAskCom, setNewAskCom] = useState('')


	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)



	const [isAsksLoading, setIsAsksLoading] = useState(false)
	const [isAskCreating, setIsAskCreating] = useState(false)





	// EFFECTS

	useEffect(() => {


		const fetchAsks = async () => {

			try {
				setIsAsksLoading(true)

				const asks = await getAllAsks()
				await getUsers()

			} catch (error) {
				console.log(error)
			} finally {
				setIsAsksLoading(false)
			}
		}

		fetchAsks()


		return () => { }
	}, [])






	// HANDLERS

	async function handleCreateAsk() {
		try {
			setIsAskCreating(true)

			const newAskData = {
				artikul: newAskArtikul,
				quant: newAskQuant,
				status: "new",
				com: newAskCom,
				asker: user?._id
			}

			await createAsk(newAskData)



		} catch (error) {
			console.log(error)
		} finally {
			setIsAskCreating(true)
			setShowModalCreateAsk(false)
			setNewAskArtikul("")
			setNewAskQuant("")
			setNewAskCom("")

		}

	}









	return (
		<PageBTW
			className="space-y-4 px-1 "
		>

			<HeaderBlock
				className="bg-indigo-500 shadow-2xl shadow-indigo-500"
			>
				Запити
			</HeaderBlock>

			<CardBlock>


				{/* BUTTONS */}





				{/* MODALS */}


				{showModalCreateAsk && <ModalWrapper
					onCancel={() => setShowModalCreateAsk(false)}
					title="Створення запиту на зняття "
				>


					<CardBlock
						className="flex flex-col space-y-8 min-w-fit max-w-lg "
					>

						<CardBlock className="grid grid-cols-1 gap-1">
							<CardBlock
								className="grid justify-self-center bg-white w-full place-content-center"
							>
								<ImageArt
									size={150}
									artikul={newAskArtikul?.length === 9 ? newAskArtikul : "1102-3092"}
								/>
							</CardBlock>
							<TextBlock className="text-xl grid justify-self-center italic">
								{artsDB?.find((art) => art.artikul === newAskArtikul)?.nameukr}
							</TextBlock>
						</CardBlock>


						<CardBlock className="space-y-2">


							<CardBlock className="grid grid-cols-1 md:grid-cols-2 space-x-2">
								<label className=" justify-self-center self-center md:justify-self-start text-xl" htmlFor="artikul">Артикул:</label>
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
								<label className=" justify-self-center self-center md:justify-self-start text-xl" htmlFor="quant">Кількість:</label>
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
								<label className=" justify-self-center self-center md:justify-self-start text-xl" htmlFor="com">Коментарій:</label>
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
								onClick={handleCreateAsk}
							>
								{isAskCreating
									?
									<Spinner color="rgb(134 239 172)" />
									:
									<>
										<TextBlock className="text-2xl"><OkIcon /></TextBlock>
										<TextBlock className=""> 	Так</TextBlock>
									</>
								}



							</ButtonBlock>
						</CardBlock>



					</CardBlock>
				</ModalWrapper>
				}









				{/* ASKS */}


				<ContainerBlock
					className="space-y-4 h-full "
				>

					<CardBlock
						className="p-1 flex justify-center"
					>
						<ButtonBlock
							className="indigo-b shadow-lg  p-4 flex  border-dashed bg-indigo-500/10 "
							onClick={() => setShowModalCreateAsk(true)}
						>
							<AddIcon />
							Створити запит
						</ButtonBlock>
					</CardBlock>




					{isAsksLoading
						?

						<Spinner color="#6366f1" />


						:
						<CardBlock
							className=" space-y-2"
						>

							{asks?.map((ask) =>

								<Link
									key={ask._id}
									to={`/asks/${ask._id}`}
									className={`
								grid overflow-auto grid-cols-1 lg:grid-cols-2 lg:text-2xl text-indigo-100 
							
								
								${ask?.status === "new" ?
											"border-indigo-500  hover:shadow-2xl hover:shadow-indigo-500 hover:bg-indigo-500 bg-indigo-500/20"
											:
											ask?.status === "solved" ?
												"border-green-500  hover:shadow-2xl hover:shadow-green-500 hover:bg-green-500 bg-green-500/20  "
												:
												ask?.status === "fail" ?
													"border-rose-500  hover:shadow-2xl hover:shadow-rose-500 hover:bg-rose-500  bg-rose-500/20 "
													:
													null
										}
								
								
								
								
								transition ease-in-out duration-500
								rounded-lg
								`}
								>

									<CardBlock
										className="grid grid-cols-1 lg:grid-cols-2 gap-2 place-items-center "
									>


										<CardBlock
											className=" flex justify-center bg-white place-self-stretch "
										>

											<ImageArt size={100} artikul={ask.artikul} />
										</CardBlock>



										<CardBlock
											className="flex flex-col items-center justify-center "
										>

											<TextBlock
												className=" justify-center text-3xl"
											>

												{ask?.artikul}
											</TextBlock>

											<TextBlock
												className=" justify-center text-base italic"
											>

												{artsDB?.find((art) => ask?.artikul === art?.artikul)?.nameukr?.slice(10)}
											</TextBlock>

										</CardBlock>





									</CardBlock>





									<CardBlock
										className=""
									>


										{ask?.quant ?
											<TextBlock
												className="text-base"
											>
												Кількість:	{ask?.quant}
											</TextBlock>
											:
											null

										}





										<TextBlock
											className="text-base"
										>
											Запит:	{users?.find(user => user._id === ask?.asker)?.fullname}
										</TextBlock>


										{ask?.solver ?
											<TextBlock
												className="text-base"
											>
												Виконав:	{users?.find(user => user._id === ask?.solver)?.fullname}
											</TextBlock>
											:
											null
										}




									</CardBlock>







								</Link>


							)
							}

						</CardBlock>

					}



				</ContainerBlock>








			</CardBlock>




		</PageBTW>
	)
}
