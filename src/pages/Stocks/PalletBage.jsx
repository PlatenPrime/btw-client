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
			className={`'
			
grid grid-cols-1 lg:grid-cols-3
				   rounded-xl 


				   ${boxes ?
					"bg-amber-500/40  hover:bg-amber-500/90 hover:shadow-lg hover:shadow-amber-500"
					:
					"bg-slate-700/50  hover:bg-slate-500 hover:shadow-lg hover:shadow-slate-500"

				}
				
			
			transition ease-in-out duration-300
			'`}
			to={`/pallets/${pallet._id}`}
		>

			<TextBlock
				className="p-3 text-3xl  rounded-xl "
			>{pallet.title}</TextBlock>





			<CardBlock
				className="p-2  grid grid-cols-2  rounded-xl "

			>

				<TextBlock
					className="text-white "
				>
					<VscNote />
					<TextBlock
						className="text-2xl"
					>
						{poses?.length}
					</TextBlock>

				</TextBlock>
				<TextBlock
					className="text-white"
				>
					<LuBox />

					<TextBlock
						className="text-2xl"
					>
						{boxes}
					</TextBlock>

				</TextBlock>

			</CardBlock>

			<TextBlock
				className="italic  p-2"
			>{pallet?.com || "-"}</TextBlock>





		</Link>
	)
}
