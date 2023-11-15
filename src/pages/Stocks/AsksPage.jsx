import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, ImageArt, InputBlock, ModalWrapper, PageBTW, TextBlock } from "../../components"
import useAskStore from './stores/asksStore'
import { useArtContext } from '../../ArtContext';
import { Link } from 'react-router-dom';
import { AddIcon } from '../../components/UI/Icons';



export default function AsksPage() {


	const { artsDB, loadingArtsDB, errorArtsDB } = useArtContext()


	const asks = useAskStore((state) => state.asks)
	const getAllAsks = useAskStore((state) => state.getAllAsks)
	const createAsk = useAskStore((state) => state.createAsk)





	const [newAskArtikul, setNewAskArtikul] = useState('')
	const [newAskQuant, setNewAskQuant] = useState('')






	const [showModalCreateAsk, setShowModalCreateAsk] = useState(false)







	// EFFECTS

	useEffect(() => {


		const fetchAsks = async () => {

			try {
				const asks = await getAllAsks()

			} catch (error) {
				console.log(error)
			}
		}

		fetchAsks()


		return () => { }
	}, [])






	// HANDLERS

	async function handleCreateAsk() {
		try {
			const newAskData = {
				artikul: newAskArtikul,
				quant: newAskQuant,
				completed: false
			}

			await createAsk(newAskData)



		} catch (error) {
			console.log(error)
		} finally {
			setShowModalCreateAsk(false)
		}



	}









	return (
		<PageBTW
			className="space-y-8"
		>

			<HeaderBlock
				className="border border-yellow-500 shadow-md shadow-yellow-500"
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
								className="grid justify-self-center"
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


							<CardBlock className="grid grid-rows-2 ">
								<label className="justify-self-center text-xl" htmlFor="artikul">Артикул:</label>
								<InputBlock
									type="text"
									id="artikul"
									name="artikul"
									autoComplete="off"
									value={newAskArtikul}
									onChange={(e) => setNewAskArtikul(e.target.value)}
								/>
							</CardBlock>





							<CardBlock className="grid grid-rows-2 ">
								<label className="justify-self-center text-xl" htmlFor="quant">Кількість:</label>
								<InputBlock
									type="number"
									id="quant"
									name="quant"
									autoComplete="off"
									value={newAskQuant}
									onChange={(e) => setNewAskQuant(e.target.value)}
								/>
							</CardBlock>

						</CardBlock>



						<CardBlock className="grid grid-cols-2 space-x-2">
							<ButtonBlock
								type="button"
								className="red-b"
								onClick={() => setShowModalCreateAsk(false)}
							>
								Скасувати
							</ButtonBlock>
							<ButtonBlock
								disabled={!newAskArtikul}
								type="submit"
								className="green-b"
								onClick={handleCreateAsk}
							>
								Створити
							</ButtonBlock>
						</CardBlock>



					</CardBlock>
				</ModalWrapper>
				}





				{/* ASKS */}


				<CardBlock
					className="space-y-4 "
				>

					<CardBlock
						className="p-1 flex"
					>
						<ButtonBlock
							className="yellow-b text-xl  p-4 flex  border-dashed w-full"
							onClick={() => setShowModalCreateAsk(true)}
						>
							<AddIcon />
							Створити запит
						</ButtonBlock>
					</CardBlock>


					<CardBlock
						className=" space-y-2"
					>

						{asks?.map((ask) =>

							<Link
								key={ask._id}
								to={`/asks/${ask._id}`}
								className=" 
								grid overflow-auto grid-cols-1 lg:grid-cols-2 
								border border-yellow-500 p-2 
								text-yellow-100 lg:text-2xl
								hover:shadow-2xl hover:shadow-yellow-500 
								hover:bg-yellow-500 transition ease-in-out duration-500
								"
							>

								<CardBlock
									className="grid grid-cols-1 lg:grid-cols-2"
								>
									<CardBlock
										className=" place-self-center bg-white "
									>

										<ImageArt size={100} artikul={ask.artikul} />
									</CardBlock>

									<TextBlock
										className=" justify-center"
									>

										{artsDB?.find((art) => ask?.artikul === art?.artikul)?.nameukr}
									</TextBlock>

								</CardBlock>





								<CardBlock
									className="grid grid-cols-1 lg:grid-cols-2"
								>

									<TextBlock
										className=""
									>
										{ask?.quant}
									</TextBlock>

									<TextBlock
										className=""
									>
										{ask?.completed ? "Так" : "Ні"}
									</TextBlock>

								</CardBlock>


							</Link>


						)
						}

					</CardBlock>

				</CardBlock>








			</CardBlock>




		</PageBTW>
	)
}
