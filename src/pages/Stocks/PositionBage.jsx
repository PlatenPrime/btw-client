import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, ImageArt, ImageBlock, TextBlock } from '../../components'
import { ImMoveDown } from 'react-icons/im'
import { MdDeleteForever } from "react-icons/md";


export default function PositionBage({ pos, onDelete, onEdit, artsDB }) {


	const defaultImageArtikul = "1102-3092"
	const artikul = artsDB?.find((art) => art.artikul === pos.artikul)





	return (
		<li className='
	 relative border border-green-500
	shadow-lg hover:shadow-green-500
		flex flex-col lg:flex-row lg:justify-between
		rounded
		transition ease-in-out duration-300	
		
		'
			key={pos._id}
		>

			<TextBlock
				className={`
					absolute top-0 left-0 z-10 bg-red-500 rounded
					${pos.date ? "p-1" : ""}
					
					`}
			>
				{pos.date}
			</TextBlock>





			<CardBlock
				className="flex w-1/2 items-center space-x-4 justify-between "
			>

			

				<ImageArt
					size={100}
					artikul={artikul ? pos.artikul : ""}
					className="rounded-lg"
				/>



				<CardBlock
					className="flex w-full "

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
				className="bg-green-500/10 w-1/2"
			>

				<thead
					className="bg-green-900 max-w-full "
				>

					<tr>

						<th
							className="w-1/5"
						>Кількість</th>
						<th
							className="w-1/5"
						>Коробки</th>
					</tr>
				</thead>


				<tr>


					<td>
						<TextBlock>
							{pos.quant}
						</TextBlock>
					</td>

					<td>
						<TextBlock>
							{pos.boxes}
						</TextBlock>
					</td>

				</tr>

			</table>






			<CardBlock
				className="flex  space-x-1 justify-evenly lg:items-center border-4 border-sky-500/20 p-2  ">

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
