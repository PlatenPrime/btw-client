import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, ImageArt, ImageBlock, TextBlock } from '../../components'
import { ImMoveDown } from 'react-icons/im'
import { MdDeleteForever } from "react-icons/md";


export default function PositionBage({ pos, onDelete, onEdit, artsDB }) {


	const defaultImageArtikul = "1102-3092"
	const artikul = artsDB?.find((art) => art.artikul === pos.artikul)





	return (
		<li className='
	 relative border-2 border-green-500
	shadow-lg hover:shadow-green-500
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
				className="flex lg:w-1/2 items-center space-x-4 justify-between "
			>



				<ImageArt
					size={100}
					artikul={artikul ? pos.artikul : ""}
					className="rounded-lg"
				/>



				<CardBlock
					className="flex w-full   "

				>

					<TextBlock
						className=" text-2xl w-1/2"
					>
						{pos.artikul}
					</TextBlock>

					<TextBlock
						className=" italic  w-1/2"
					>
						{artikul ? artikul?.nameukr.slice(9) : "-"}
					</TextBlock>

				</CardBlock>

			</CardBlock>




			<table
				className="  w-full lg:w-1/2"
			>

				<thead
					className=" max-w-full "
				>

					<tr>

						<th
							className="bg-sky-500/10"
						>Кількість</th>
						<th
							className="bg-amber-600/10"
						>Коробки</th>
					</tr>
				</thead>


				<tbody>

					<tr>


						<td
							className="bg-sky-500/10"
						>
							<TextBlock
								className="text-sky-500 text-2xl rounded"
							>
								{pos.quant}
							</TextBlock>
						</td>

						<td
							className="bg-amber-600/10"
						>
							<TextBlock
								className="text-amber-600 text-2xl rounded"
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
					className=" edit-c text-3xl"
					onClick={onEdit}
				>
					<ImMoveDown />
				</ButtonBlock>

				<ButtonBlock
					className="delete-c text-3xl "
					onClick={onDelete}
				>
					<MdDeleteForever />
				</ButtonBlock>


			</CardBlock>





		</li>
	)
}
