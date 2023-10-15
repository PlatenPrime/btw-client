import React from 'react'
import { ButtonBlock, CardBlock, TextBlock } from '../../components'
import { ImMoveUp } from 'react-icons/im'
import { AiOutlineClose } from 'react-icons/ai'
import { MdDeleteForever } from "react-icons/md";

export default function PositionBage({ pos, onDelete, onEdit }) {
	return (
		<li className='border border-green-500 p-2 relative' key={pos._id}>

			<TextBlock
				className="absolute top-0 left-0 bg-red-500"

			>{pos.date}</TextBlock>
			<TextBlock>Артикул: {pos.artikul}</TextBlock>
			<TextBlock>Количество: {pos.quant}</TextBlock>

			<CardBlock
				className="absolute top-1 right-1 space-x-1 ">

				<ButtonBlock
					className=" edit-c"
				>
					<ImMoveUp />
				</ButtonBlock>

				<ButtonBlock
					className="delete-c"
					onClick={onDelete}
				>
					<MdDeleteForever />
				</ButtonBlock>


			</CardBlock>
		</li>
	)
}
