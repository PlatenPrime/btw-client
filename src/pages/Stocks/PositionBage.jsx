import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, ImageArt, ImageBlock, TextBlock } from '../../components'
import { ImMoveDown } from 'react-icons/im'
import { MdDeleteForever } from "react-icons/md";
import { BsBalloon, BsBoxSeam } from "react-icons/bs";


export default function PositionBage({ pos, onDelete, onEdit, artsDB }) {


	const defaultImageArtikul = "1102-3092"
	const artikul = artsDB?.find((art) => art.artikul === pos.artikul)





	return (
		<li className='
	 relative border-2 border-teal-500
	shadow-lg hover:shadow-teal-500
		flex flex-col lg:flex-row lg:justify-between
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
				className="flex lg:w-3/4 items-center space-x-4 justify-between "
			>



				<CardBlock
					className="bg-white h-full flex items-center justify-center"
				>

					<ImageArt
						size={100}
						artikul={artikul ? pos.artikul : ""}
						className="rounded-lg"
					/>

				</CardBlock>

				<CardBlock
					className="flex w-full space-x-1  "

				>

					<TextBlock
						className=" text-2xl w-1/3"
					>
						{pos.artikul}
					</TextBlock>

					<TextBlock
						className=" italic text-lg flex justify-start p-1  w-2/3"
					>
						{artikul ? artikul?.nameukr.slice(9) : "-"}
					</TextBlock>

				</CardBlock>

			</CardBlock>




			<table
				className="  w-full lg:w-1/4"
			>

				<thead
					className=" max-w-full "
				>

					<tr
						className=""
					>

						<th
							className="text-sky-300  text-3xl w-1/3"
						><BsBalloon /></th>


						<td

						>
							<TextBlock
								className="text-sky-300  font-bold text-2xl  rounded"
							>
								{pos.quant}
							</TextBlock>
						</td>


					</tr>


				</thead>


				<tbody>

					<tr
						className="bg-teal-900/10"
					>

						<th
							className="text-amber-300  text-3xl  w-1/3"
						><BsBoxSeam /></th>


						<td
							className=""
						>
							<TextBlock
								className="text-amber-300 font-bold text-2xl rounded"
							>
								{pos.boxes}
							</TextBlock>
						</td>

					</tr>

				</tbody>

			</table>






			<CardBlock
				className="flex  space-x-1 justify-evenly lg:items-center rounded-b-xl rounded-r-xl p-2  bg-slate-900 hover:bg-slate-800">

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
	)
}
