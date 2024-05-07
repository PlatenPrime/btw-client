import React, { useEffect, useState } from 'react'
import { ButtonBlock, ButtonGroup, CardBlock, ContainerBlock, HeaderBlock, ImageArt, InputBlock, ModalConfirm, ModalWrapper, PageBTW, Spinner, TextBlock } from "../../components"
import useAskStore from './stores/asksStore'
import useAuthStore from "../Auth/authStore"
import { Link } from 'react-router-dom';
import { AddIcon, CancelIcon, OkIcon } from '../../components/UI/Icons';

import { sendMessageToTelegram } from "../../utils/sendMessagesTelegram"
import useFetchArts from '../../hooks/useFetchArts';
import ModalCreateAsk from '../Asks/components/modals/ModalCreateAsk';



export default function AsksPage() {


	const { artsDB, loadingArtsDB, errorArtsDB } = useFetchArts()


	const { asks, getAllAsks, createAsk } = useAskStore()
	const { user, users, getUsers } = useAuthStore()





	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)



	const [isAsksLoading, setIsAsksLoading] = useState(false)






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








	return (
		<PageBTW
			className="space-y-4 px-1 "
		>

			<HeaderBlock
				className="bg-indigo-500 shadow-2xl shadow-indigo-500"
			>
				Запити
			</HeaderBlock>








			{isAsksLoading
				?



				<ContainerBlock
					className="w-full h-full flex justify-start items-center"
				>
					<Spinner color="rgb(99 102 241 )" />
				</ContainerBlock>

				:

				<>








					{/* BUTTONS */}



					<ButtonGroup>
						<ButtonGroup.Actions>
							<ButtonBlock
								className="indigo-b  "
								onClick={() => setShowModalCreateAsk(true)}
							>
								<AddIcon />
								Створити запит
							</ButtonBlock>
						</ButtonGroup.Actions>
					</ButtonGroup>






					{/* MODALS */}


					<ModalCreateAsk 
					 showModalCreateAsk={showModalCreateAsk}
					 setShowModalCreateAsk={setShowModalCreateAsk}
					
					/>

			


					{/* ASKS */}


					<ContainerBlock
						className="space-y-4 h-full "
					>





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
													className=" justify-center items-center w-full text-center text-base italic"
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
													className="text-base font-bold"
												>
													Кількість:	{ask?.quant}
												</TextBlock>
												:
												null

											}

											{ask?.com ?
												<TextBlock
													className="text-base italic"
												>
													Комент:	{ask?.com}
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


				</>
			}



		</PageBTW>
	)
}
