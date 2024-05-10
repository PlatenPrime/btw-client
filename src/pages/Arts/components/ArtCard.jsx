import React from 'react'
import { CardBlock, ContainerBlock, ImageArt, TextBlock } from '../../../components'
import { VscLocation } from 'react-icons/vsc'
import { BsBalloon } from 'react-icons/bs'
import { FaWarehouse } from 'react-icons/fa6'
import { PiCurrencyDollarBold } from "react-icons/pi";
import { MdSunnySnowing, MdSunny } from "react-icons/md";

export default function ArtCard(
	{
		artikul,
		remains,
		title,
		ostatok,
		posesWithArtikul,
		artPrice
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
				className="flex flex-col items-center space-y-2 w-full "
			>

				<TextBlock
					className="text-3xl w-full  p-1  lg:text-center  rounded-xl"
				>
					{artikul?.nameukr}
				</TextBlock>


				<CardBlock
					className="w-full space-y-2  p-1  rounded-xl"
				>

					<CardBlock
						className="grid grid-colums-1 lg:grid-cols-2 gap-2"
					>
						<TextBlock className="  text-xl bg-gradient-to-b from-orange-500 to-orange-700/50  p-1 rounded-lg " >
							<VscLocation size={24} />{artikul?.zone}
						</TextBlock>

						<TextBlock
							className=" text-xl bg-gradient-to-b from-green-500 to-green-700/50  p-1 rounded-lg">
							<PiCurrencyDollarBold size={24} /> {artPrice} грн
						</TextBlock>


					</CardBlock>



					<CardBlock
						className="grid grid-colums-1 lg:grid-cols-2 gap-2"
					>

						<TextBlock
							className="text-xl bg-gradient-to-b from-blue-500 to-blue-700/50  p-1 rounded-lg"
						>
							<MdSunnySnowing size={24} /> {" "}  {remains ? remains[title] : ""}
						</TextBlock>

						<TextBlock
							className="text-xl bg-gradient-to-b from-lime-500 to-lime-700/50   p-1 rounded-lg"
						>
							<MdSunny size={24} /> {" "}	{ostatok}
						</TextBlock>

					</CardBlock>




					<CardBlock
						className="grid grid-colums-1 lg:grid-cols-2 gap-2"
					>
						<TextBlock
							className="lg:col-span-2 space-x-2 text-xl bg-gradient-to-b from-stone-500 to-stone-700/50   p-1 rounded-lg items-center">
							<FaWarehouse size={24} />
							<span> Склад: {" "} {posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)}</span>
						</TextBlock>

						<TextBlock
							className="space-x-2 text-xl bg-gradient-to-b from-emerald-500 to-emerald-700/50   p-1 rounded-lg items-center">
							<FaWarehouse size={24} />
							<span> Погреби: {" "} {posesWithArtikul?.filter((pos) => pos.sklad === "pogrebi").reduce((a, b) => a + parseInt(b.quant), 0)}</span>
						</TextBlock>

						<TextBlock
							className="space-x-2 text-xl bg-gradient-to-b from-yellow-500 to-yellow-700/50   p-1 rounded-lg items-center">
							<FaWarehouse size={24} /> <span> Мережі: {" "} {posesWithArtikul?.filter((pos) => pos.sklad === "merezhi").reduce((a, b) => a + parseInt(b.quant), 0)}</span>
						</TextBlock>

					</CardBlock>

				</CardBlock>


			</CardBlock>

		</ContainerBlock>
	)
}
