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
			className="space-y-2"
		>

			<HeaderBlock
				className="border border-yellow-500 shadow-md shadow-yellow-500"
			>
				Запити
			</HeaderBlock>

			<CardBlock>


				{/* BUTTONS */}

				<CardBlock
					className="p-1"
				>
					<ButtonBlock
						className="yellow-b"
						onClick={() => setShowModalCreateAsk(true)}
					>
						Створити запит
					</ButtonBlock>
				</CardBlock>


				{/* MODALS */}


				{showModalCreateAsk && <ModalWrapper
					onCancel={() => setShowModalCreateAsk(false)}
					title="Створення запиту на зняття "

				>

				</ModalWrapper>
				}





				{/* ASKS */}


				<CardBlock
					className="space-y-8"
				>

					<TextBlock
						className="text-yellow-500 text-3xl"
					>
						Запити на зняття
					</TextBlock>


					<CardBlock
						className=" space-y-2"
					>

						{asks?.map((ask) => <Link
							key={ask._id}
							to={`/asks/${ask._id}`}

						>
							<CardBlock

								className=" grid overflow-auto grid-cols-4 border border-yellow-500 p-2 "
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
									{ask?.asker.slice(0, 10)}
								</TextBlock>
								<TextBlock
									className=""
								>
									{ask?.asker.slice(0, 10)}
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
