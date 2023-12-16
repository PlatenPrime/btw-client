import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, ImageArt, ImageBlock, TextBlock } from '../../components'
import { ImMoveDown } from 'react-icons/im'
import { MdDeleteForever } from "react-icons/md";
import { BsBalloon, BsBoxSeam } from "react-icons/bs";


export default function PositionBage({ pos, onDelete, onEdit, artsDB }) {


	const defaultImageArtikul = "1102-3092"
	const artikul = artsDB?.find((art) => art.artikul === pos.artikul)





	return (

		<>
			<li className='hidden lg:grid grid-cols-6
	 relative border-2 border-teal-500
	shadow-lg hover:shadow-teal-500
	
		rounded-xl
		transition ease-in-out duration-300	
		
		'
				key={pos._id}
			>

				<TextBlock
					className={`
					absolute top-0 left-0 z-10 bg-red-500 rounded-xl
					${pos.date ? "p-1" : ""}
					
					`}
				>
					{pos.date}
				</TextBlock>


				<CardBlock
					className="col-span-3 grid grid-cols-3"
				>


					<CardBlock
						className="col-span-1 bg-white rounded-l-xl grid "
					>

						<ImageArt
							size={150}
							artikul={artikul ? pos.artikul : ""}
							className="rounded-lg justify-self-center self-center"
						/>

					</CardBlock>





					<CardBlock
						className="grid grid-rows-2 col-span-2  p-2 "

					>

						<TextBlock
							className=" text-3xl text-center self-center justify-self-center  "
						>
							{pos.artikul}
						</TextBlock>

						<TextBlock
							className=" italic text-center text-lg self-center justify-self-center p-1 "
						>
							{artikul ? artikul?.nameukr.slice(9) : "-"}
						</TextBlock>

					</CardBlock>




				</CardBlock>







				<CardBlock
					className="col-span-2"
				>

					<CardBlock
						className="grid grid-cols-2 p-2 gap-2">


						<CardBlock
							className="flex justify-center items-center"
						>

							<TextBlock
								className="text-sky-300  text-3xl"
							><BsBalloon /></TextBlock>

							<TextBlock
								className="text-sky-300  font-bold text-2xl  rounded"
							>
								{pos.quant}
							</TextBlock>

						</CardBlock>


						<CardBlock
							className="flex justify-center items-center"
						>
							<TextBlock
								className="text-amber-300  text-3xl "
							><BsBoxSeam /></TextBlock>

							<TextBlock
								className="text-amber-300  font-bold text-2xl  rounded"
							>
								{pos.boxes}
							</TextBlock>
						</CardBlock>




					</CardBlock>


					<CardBlock
						className="flex flex-col  space-x-1  "

					>

						<TextBlock
							className=" text-2xl  "
						>
							{pos.sklad === "pogrebi" ? "Погреби" : pos.sklad === "merezhi" ? "Мережі" : null}
						</TextBlock>

						<TextBlock
							className=" text-2xl  "
						>
							{pos.com}
						</TextBlock>



					</CardBlock>

				</CardBlock>




				<CardBlock
					className="col-span-1 flex  space-x-1 justify-evenly lg:items-center rounded-b-xl rounded-r-xl p-2  bg-slate-900 hover:bg-slate-800">

					<ButtonBlock
						className=" blue-b text-3xl"
						onClick={onEdit}
					>
						<ImMoveDown />
					</ButtonBlock>

					<ButtonBlock
						className="red-b text-3xl "
						onClick={onDelete}
					>
						<MdDeleteForever />
					</ButtonBlock>


				</CardBlock>




			</li>

		</>

	)
}
