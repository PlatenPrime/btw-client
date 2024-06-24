import React from 'react';
import { Link } from 'react-router-dom';
import { CardBlock, ImageArt, TextBlock } from '../../../components';
import { VscLocation } from "react-icons/vsc";

import { BsBalloon, BsBoxSeam } from "react-icons/bs";
import { PalletIcon } from '../../../components/UI/Icons';





const StockBage = ({ pos, nameukr }) => {





	if (!pos) {
		return (
			<TextBlock className='text-center text-3xl'>
				Завантаження...
			</TextBlock>
		)
	}



	return (

		<CardBlock


			className={`	grid grid-cols-1 lg:grid-cols-6
			w-full  space-x-2
				rounded-xl
			text-white 
				 hover:shadow-2xl 
${pos.quant
					?
					" hover:shadow-lg  hover:shadow-emerald-500 hover:bg-emerald-500   bg-gradient-to-b from-emerald-500/50 to-emerald-700/50  "
					: " hover:shadow-lg  hover:shadow-slate-500 hover:bg-slate-500   bg-gradient-to-b from-slate-500/50 to-slate-700/50  "}
				 
				 transition ease-in-out duration-300`}


		>




			<CardBlock
				className="flex items-center justify-center bg-white rounded-xl  p-1 col-span-1"
			>

				<ImageArt size={80} artikul={pos?.artikul} className="rounded-xl" />

			</CardBlock>




			<Link
				className="grid grid-cols-3 col-span-5  "
				to={`/rows/pallets/${pos?.pallet}`}
			>

				<CardBlock
					className="col-span-3 lg:col-span-1  place-content-center "
				>
					<TextBlock className=" justify-center  text-2xl " >{pos?.artikul}</TextBlock>
					<TextBlock className=" justify-center text-base italic" >{nameukr?.slice(10)}</TextBlock>

				</CardBlock>





				<TextBlock
					className="col-span-3 lg:col-span-1 px-8 justify-self-center text-2xl"
				>
					<PalletIcon />
					{pos?.palletTitle}
				</TextBlock>





				<CardBlock
					className="col-span-3 lg:col-span-1 grid grid-cols-2"
				>
					<CardBlock
						className="flex items-center space-x-2 justify-self-center"
					>
						<BsBoxSeam />
						<TextBlock className=" text-2xl  " >{pos?.boxes}</TextBlock>

					</CardBlock>

					<CardBlock
						className="flex items-center space-x-2 justify-self-center"
					>
						<BsBalloon />
						<TextBlock className=" text-2xl  " >{pos?.quant}</TextBlock>
					</CardBlock>


				</CardBlock>

			</Link>


		</CardBlock>

	);
};

export default StockBage;