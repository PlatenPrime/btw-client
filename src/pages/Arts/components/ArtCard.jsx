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
			className=" grid gap-2"
		>
			<CardBlock
				className="flex gap-2"
			>
				<CardBlock
					className="
						 flex justify-center items-center 
						bg-white rounded-xl shadow-sm shadow-white
						"
				>
					<ImageArt size={100} artikul={artikul?.artikul} className="rounded-xl" />
				</CardBlock>


				<TextBlock
					className="text-lg lg:text-3xl text-center w-full  p-1 bg-gradient-to-b  from-sky-500/80 to-sky-700/50  rounded-xl"
				>
					{artikul?.nameukr}
				</TextBlock>
			</CardBlock>



			<CardBlock
			className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 "
			>


				<CardBlock
					className="grid gap-1  bg-gradient-to-b  from-slate-500/80 to-slate-800/50 rounded-xl"
				>
					<TextBlock className="items-center justify-between   px-4  " >
						<span className="flex"><VscLocation size={24} color='orange' />Зона: </span>
						<span className="text-orange-300">{artikul?.zone}</span>
					</TextBlock>

					<TextBlock
						className=" items-center justify-between px-4 ">
						<span className="flex"><PiCurrencyDollarBold size={24} color='rgb(134 239 172)' />Ціна:	</span>
						<span className="text-green-300" >{artPrice} грн</span>
					</TextBlock>


					<TextBlock
						className=" items-center justify-between  px-4  "
					>
						<span className="flex"><MdSunnySnowing size={24} color='rgb(249 168 212)' />Ранок:	</span>
						<span className="text-pink-300" >{remains ? remains[title] : ""}</span>
					</TextBlock>

					<TextBlock
						className=" items-center justify-between   px-4 "
					>
						<span className="flex"><MdSunny size={24} color='rgb(253 224 71)' /> Зараз:	</span>
						<span className="text-yellow-300" >{ostatok}</span>
					</TextBlock>

				</CardBlock>





				<CardBlock
					className="grid bg-gradient-to-b  bg-gradient-to-b  from-slate-500/80 to-slate-800/50  rounded-xl overflow-hidden"

				>
					<TextBlock
						className=" px-4   items-center justify-between gap-2 ">

						<span className="flex items-center"><FaWarehouse color='rgb(147 197 253)'  size={16} /> Склад: </span>
						<span className="text-blue-300"> {posesWithArtikul?.reduce((a, b) => a + parseInt(b.quant), 0)}</span>
					</TextBlock>

					<TextBlock
						className="     px-4  items-center justify-between  ">
						<span className="flex items-center"><FaWarehouse color='rgb(110 231 183)'  size={16} />Погреби: </span>
						<span className="text-emerald-300" > {posesWithArtikul?.filter((pos) => pos.sklad === "pogrebi").reduce((a, b) => a + parseInt(b.quant), 0)}</span>
					</TextBlock>

					<TextBlock
						className="   px-4   items-center justify-between  ">
						<span className="flex items-center"><FaWarehouse color='rgb(252 211 77)'  size={16} />Мережі:  </span>
						<span className="text-amber-300" >  {posesWithArtikul?.filter((pos) => pos.sklad === "merezhi").reduce((a, b) => a + parseInt(b.quant), 0)}</span>
					</TextBlock>
				</CardBlock>

			</CardBlock>

		</ContainerBlock>
	)
}
