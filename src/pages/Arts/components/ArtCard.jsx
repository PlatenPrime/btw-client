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
						bg-white rounded-xl shadow-lg shadow-white
						"
			>

				<ImageArt size={200} artikul={artikul?.artikul} className="rounded-xl" />
			</CardBlock>






			<CardBlock
				className="grid grid-cols-1 lg:grid-cols-2  w-full gap-2 "
			>

				<TextBlock
					className="text-3xl text-center w-full  p-1 bg-gradient-to-b  from-sky-500/50 to-sky-900/50  rounded-xl"
				>
					{artikul?.nameukr}
				</TextBlock>


				<CardBlock
					className="grid gap-2"
				>

					<TextBlock className="  text-xl bg-gradient-to-b from-sky-500/50 to-sky-900/50  p-1 rounded-lg justify-between" >
						<span className="flex"><VscLocation size={24} />Зона: </span>
						<span>{artikul?.zone}</span>

					</TextBlock>



					<TextBlock
						className=" text-xl bg-gradient-to-b from-sky-500/50 to-sky-900/50 p-1 rounded-lg justify-between">
						<span className="flex"><PiCurrencyDollarBold size={24} />Ціна:	</span>
						<span>{artPrice} грн</span>

					</TextBlock>


					<TextBlock
						className="text-xl bg-gradient-to-b from-sky-500/50 to-sky-900/50  p-1 rounded-lg justify-between"
					>
						<span className="flex"><MdSunnySnowing size={24} />Ранок:	</span>
						<span>{remains ? remains[title] : ""}</span>
					</TextBlock>




					<TextBlock
						className="text-xl bg-gradient-to-b from-sky-500/50 to-sky-900/50   p-1 rounded-lg justify-between"
					>
						<span className="flex"><MdSunny size={24} /> Залишок:	</span>
						<span>{ostatok}</span>

					</TextBlock>


				</CardBlock>







				<TextBlock
					className=" row-span-2 space-x-2 text-xl bg-gradient-to-b from-teal-500/50 to-teal-900/50   p-1 rounded-lg items-center justify-between">

					<span className="flex"><FaWarehouse size={24} />Склад: </span>
					<span> {posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)}</span>
				</TextBlock>

				<TextBlock
					className="space-x-2 text-xl bg-gradient-to-b from-teal-500/50 to-teal-900/50    p-1 rounded-lg items-center justify-between ">
					<span className="flex"><FaWarehouse size={24} />Погреби: </span>
					<span> {posesWithArtikul?.filter((pos) => pos.sklad === "pogrebi").reduce((a, b) => a + parseInt(b.quant), 0)}</span>
				</TextBlock>

				<TextBlock
					className="space-x-2 text-xl bg-gradient-to-b from-teal-500/50 to-teal-900/50    p-1 rounded-lg items-center justify-between ">
					<span className="flex"><FaWarehouse size={24} />Мережі:  </span>
					<span>  {posesWithArtikul?.filter((pos) => pos.sklad === "merezhi").reduce((a, b) => a + parseInt(b.quant), 0)}</span>
				</TextBlock>





			</CardBlock>

		</ContainerBlock>
	)
}
