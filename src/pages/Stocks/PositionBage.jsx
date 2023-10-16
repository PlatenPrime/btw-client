import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, ImageBlock, TextBlock } from '../../components'
import { ImMoveUp } from 'react-icons/im'
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
				className="flex items-center space-x-4 justify-center bg-gray-300/10"
			>

				<ImageBlock
					src={`https://sharik.ua/images/elements_big/${artikul ? pos.artikul : defaultImageArtikul}_m1.jpg`}
					width={100}
					height={100}
					alt="Фото артикула"
					className={`rounded  `}

				/>


			</CardBlock>


			<table
				className="bg-green-500/10"
			>

				<thead
					className="bg-green-900"
				>

					<tr>
						<th
							className="w-1/5"
						>Позиція</th>
						<th
							className="w-2/5"
						>Артикул</th>
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
						<TextBlock
							className="flex flex-nowrap text-xl"
						>
							{pos.artikul}
						</TextBlock>
					</td>


					<td>
						<TextBlock>
							{artikul ? artikul?.nameukr.slice(9) : "-"}
						</TextBlock>
					</td>

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
				className="flex  space-x-1 justify-evenly lg:items-center border border-sky-500 p-2 ">

				<ButtonBlock
					className=" edit-c text-3xl"
					onClick={onEdit}
				>
					<ImMoveUp />
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
