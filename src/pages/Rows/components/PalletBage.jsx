import React from 'react'
import { Link } from 'react-router-dom'
import { CardBlock, TextBlock } from '../../../components'
import { LuBox } from "react-icons/lu";
import { VscNote } from "react-icons/vsc";
import { LiaPalletSolid } from 'react-icons/lia';







export default function PalletBage({ pallet, poses }) {




	const boxes = poses?.reduce((a, b) => a + b.boxes, 0)






	return (
		<Link
			className={`'
			
grid grid-cols-1 lg:grid-cols-3
				   rounded-xl 
				   transition ease-in-out duration-300

				   ${boxes ?
					"bg-gradient-to-b from-amber-600/80 to-amber-900/80  hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500"
					:
					"bg-gradient-to-b from-slate-500/80 to-slate-700/50  hover:bg-slate-500 hover:shadow-lg hover:shadow-slate-500"
				}
				'`}
			to={`/pallets/${pallet._id}`}
		>

			<TextBlock
				className="p-3 text-3xl   lg:justify-start rounded-xl "
			>
				<LiaPalletSolid size={24} />
				{pallet.title}
			</TextBlock>





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


			{pallet?.com &&
				<TextBlock
					className="italic  p-2"
				>
					{pallet?.com}
				</TextBlock>}







		</Link>
	)
}
