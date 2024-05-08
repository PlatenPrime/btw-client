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
						<TextBlock className="  text-xl bg-orange-500/50   p-1 rounded-lg " >
							<VscLocation size={24} />{artikul?.zone}
						</TextBlock>

						<TextBlock
							className=" text-xl bg-green-500/50  p-1 rounded-lg">
							<PiCurrencyDollarBold size={24} /> {artPrice}
						</TextBlock>


					</CardBlock>



					<CardBlock
						className="grid grid-colums-1 lg:grid-cols-2 gap-2"
					>

						<TextBlock
							className="text-xl bg-blue-500/50   p-1 rounded-lg"
						>
							<MdSunnySnowing size={24}  /> {" "}  {remains ? remains[title] : ""}
						</TextBlock>

						<TextBlock
							className="text-xl bg-lime-500/50   p-1 rounded-lg"
						>
							<MdSunny size={24}  /> {" "}	{ostatok}
						</TextBlock>

					</CardBlock>




					<CardBlock
						className="grid grid-colums-1 lg:grid-cols-2 gap-2"
					>
						<TextBlock
							className="lg:col-span-2  text-xl bg-stone-500/50   p-1 rounded-lg items-center">
							<FaWarehouse size={24}  /> Склад: {" "} {posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)}
						</TextBlock>

						<TextBlock
							className=" text-xl bg-emerald-500/50   p-1 rounded-lg items-center">
							<FaWarehouse size={24}  />  Погреби: {" "} {posesWithArtikul?.filter((pos) => pos.sklad === "pogrebi").reduce((a, b) => a + parseInt(b.quant), 0)}
						</TextBlock>

						<TextBlock
							className=" text-xl bg-yellow-500/50   p-1 rounded-lg items-center">
							<FaWarehouse size={24}  />  Мережі: {" "} {posesWithArtikul?.filter((pos) => pos.sklad === "merezhi").reduce((a, b) => a + parseInt(b.quant), 0)}
						</TextBlock>

					</CardBlock>

				</CardBlock>


			</CardBlock>

		</ContainerBlock>
	)
}
