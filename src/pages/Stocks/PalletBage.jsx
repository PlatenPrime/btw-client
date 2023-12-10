import React from 'react'
import { Link } from 'react-router-dom'
import { CardBlock, TextBlock } from '../../components'
import { LuBox } from "react-icons/lu";
import { VscNote } from "react-icons/vsc";







export default function PalletBage({ pallet, poses }) {


	console.log(poses);


	const boxes = poses?.reduce((a, b) => a + b.boxes, 0)






	return (
		<Link
			className='
			
grid grid-cols-1 lg:grid-cols-3
				   rounded 
				border-2 border-amber-500 
				 bg-transparent  hover:bg-amber-500/20

				 shadow-inner hover:shadow-amber-500
			transition ease-in-out duration-300
			'
			to={`/pallets/${pallet._id}`}
		>

			<TextBlock
				className="p-3 text-3xl bg-amber-100/10"
			>{pallet.title}</TextBlock>





			<CardBlock
				className="p-2  grid grid-cols-2 text-2xl"

			>

				<TextBlock
					className="text-teal-500"
				><VscNote /> {poses?.length}</TextBlock>
				<TextBlock
					className="text-yellow-500"
				>
					<LuBox />
					{boxes}</TextBlock>

			</CardBlock>

			<TextBlock
				className="italic bg-amber-500/20 p-2"
			>{pallet.com}</TextBlock>





		</Link>
	)
}
