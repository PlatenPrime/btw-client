import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, HeaderBlock, ModalWrapper, PageBTW, TextBlock } from "../../components"
import useAskStore from './stores/asksStore'
import { useArtContext } from '../../ArtContext';
import { Link } from 'react-router-dom';



export default function AsksPage() {


	const asks = useAskStore((state) => state.asks)
	const getAllAsks = useAskStore((state) => state.getAllAsks)








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
							className="yellow-b p-4 mx-auto"
							onClick={() => setShowModalCreateAsk(true)}
						>
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
								className=" grid overflow-auto grid-cols-3 border border-yellow-500 p-2 "
							>
								<TextBlock
									className=""
								>
									{ask?.artikul}
								</TextBlock>

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




							</Link>


						)
						}

					</CardBlock>

				</CardBlock>








			</CardBlock>




		</PageBTW>
	)
}
