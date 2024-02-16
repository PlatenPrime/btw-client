import React from 'react'
import { CardBlock, ContainerBlock, ImageArt, TextBlock } from '../../../components'
import { VscLocation } from 'react-icons/vsc'
import { BsBalloon } from 'react-icons/bs'
import { FaWarehouse } from 'react-icons/fa6'

export default function ArtCard(
	{
		artikul,
		remains,
		title,
		ostatok,
		posesWithArtikul
	}

) {





	return (
		<ContainerBlock
			className="
					flex flex-col lg:flex-row lg:justify-start space-y-2 lg:space-x-2 
					
					
					"
		>

			<CardBlock
				className="
						w-full lg:w-fit flex justify-center items-center 
						bg-white rounded-xl
						"
			>

				<ImageArt size={200} artikul={artikul?.artikul} className="rounded-xl" />
			</CardBlock>

			<CardBlock
				className="flex flex-col items-center space-y-2 "
			>

				<TextBlock
					className="text-2xl   p-1  lg:text-left bg-slate-700 rounded-xl"
				>
					{artikul?.nameukr}
				</TextBlock>


				<CardBlock
					className="w-full flex items-start flex-col  p-1 bg-slate-700 rounded-xl"
				>

					<TextBlock className="  text-xl   p-1 rounded text-orange-100" >
						<VscLocation />{artikul?.zone}
					</TextBlock>


					<CardBlock
						className="flex space-x-2"
					>
						<TextBlock

							className="text-rose-100  text-xl"
						>

							<BsBalloon />
						</TextBlock>
						<TextBlock
							className="text-yellow-100   text-xl  rounded"

						>
							Ранок: {" "} {remains ? remains[title] : ""}
						</TextBlock>
					</CardBlock>



					<CardBlock
						className="flex space-x-2"
					>
						<TextBlock
							className="text-green-100  text-xl">
							<BsBalloon />
						</TextBlock>
						<TextBlock
							className="text-green-100   text-xl  rounded"
						>
							База: {" "}	{ostatok}
						</TextBlock>
					</CardBlock>


					<CardBlock
						className="flex space-x-2"
					>


						<TextBlock
							className="  text-xl">
							<FaWarehouse />
						</TextBlock>

						<TextBlock
							className="  text-xl">
							Склад: {" "} {posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)}

						</TextBlock>
					</CardBlock>


					<CardBlock
						className="flex space-x-2"
					>


						<TextBlock
							className="text-blue-100  text-xl">
							<FaWarehouse />
						</TextBlock>

						<TextBlock
							className="text-blue-100  text-xl">
							Погреби: {" "} {posesWithArtikul?.filter((pos) => pos.sklad === "pogrebi").reduce((a, b) => a + parseInt(b.quant), 0)}

						</TextBlock>
					</CardBlock>




					<CardBlock
						className="flex space-x-2"
					>


						<TextBlock
							className="text-yellow-100 text-xl">
							<FaWarehouse />
						</TextBlock>

						<TextBlock
							className="text-yellow-100  text-xl">
							Мережі: {" "} {posesWithArtikul?.filter((pos) => pos.sklad === "merezhi").reduce((a, b) => a + parseInt(b.quant), 0)}

						</TextBlock>
					</CardBlock>



				</CardBlock>


			</CardBlock>

		</ContainerBlock>
	)
}
