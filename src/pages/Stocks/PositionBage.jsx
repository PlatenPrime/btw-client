import React, { useEffect, useState } from 'react'
import { ButtonBlock, CardBlock, ImageBlock, TextBlock } from '../../components'
import { ImMoveUp } from 'react-icons/im'
import { MdDeleteForever } from "react-icons/md";
import useFetchArts from '../../hooks/useFetchArts';

export default function PositionBage({ pos, onDelete, onEdit, artsDB }) {


	const defaultImageArtikul = "1102-3092"

	const artikul = artsDB?.find((art) => art.artikul === pos.artikul)

	console.log(pos)



	return (
		<li className='
		border border-green-500 p-2 relative
	shadow hover:shadow-green-500
		flex flex-col lg:flex-row lg:justify-between
		rounded
		transition ease-in-out duration-300	
		space-y-2
		'
			key={pos._id}
		>

			<TextBlock
				className={`
					absolute top-0 left-0 z-50 bg-red-500 rounded
					${pos.date ? "p-1" : ""}
					
					`}
			>
				{pos.date}
			</TextBlock>





			<CardBlock
				className="flex space-x-4 justify-center bg-white"
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
			className = "bg-green-500/10"
			>

				<tr>
					<th>Позиція</th>
					<th>Артикул</th>
					<th>Кількість</th>
					<th>Коробок</th>
				</tr>


				<tr>

					<td>
						<TextBlock
							className="flex flex-nowrap"
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
