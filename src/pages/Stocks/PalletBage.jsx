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
				   rounded-xl 
				
				 bg-amber-500/10  hover:bg-amber-500/50

				
			transition ease-in-out duration-300
			'
			to={`/pallets/${pallet._id}`}
		>

			<TextBlock
				className="p-3 text-3xl bg-amber-100/10  rounded-xl "
			>{pallet.title}</TextBlock>





			<CardBlock
				className="p-2  grid grid-cols-2 text-2xl  rounded-xl "

			>

				<TextBlock
					className="text-teal-300"
				><VscNote /> {poses?.length}</TextBlock>
				<TextBlock
					className="text-yellow-300"
				>
					<LuBox />
					{boxes}</TextBlock>

			</CardBlock>

			<TextBlock
				className="italic  p-2"
			>{pallet.com}</TextBlock>





		</Link>
	)
}
