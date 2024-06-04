import React from 'react';
import { Link } from 'react-router-dom';
import { CardBlock, ImageArt, TextBlock } from '../../components';
import { VscLocation } from "react-icons/vsc";

import { BsBalloon, BsBoxSeam } from "react-icons/bs";





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


			className={`	flex  justify-center 
			w-full  space-x-2
				rounded-xl
			text-white 
			 
				
				 hover:shadow-2xl 

${pos.quant ? "bg-emerald-700/30 hover:shadow-emerald-500 hover:bg-emerald-500  " : "bg-slate-700/30 hover:shadow-slate-500 hover:bg-slate-500  "}
				 
				 transition ease-in-out duration-300`}


		>




			<CardBlock
				className="flex items-center bg-white rounded-l-xl rounded-r-none p-1"
			>

				<ImageArt size={50} artikul={pos?.artikul} className="rounded-l-xl" />

			</CardBlock>


			<Link
				className="  w-full flex flex-col lg:hidden  space-y-4 p-2"
				to={`/pallets/${pos?.pallet}`}
			>

				<TextBlock className="justify-start text-xl italic " >{pos?.artikul}</TextBlock>
				{nameukr && <TextBlock className="justify-start text-xl italic " >{nameukr?.slice(10)}</TextBlock>}
				<TextBlock className="justify-start text-xl italic " >{pos?.boxes}</TextBlock>
				<TextBlock className="justify-start text-xl italic " >{pos?.quant}</TextBlock>



			</Link>




			<Link
				className="hidden lg:flex items-center justify-between w-full space-x-4  "
				to={`/pallets/${pos?.pallet}`}
			>


				<CardBlock>
					<TextBlock className=" justify-start text-xl " >{pos?.artikul}</TextBlock>
					<TextBlock className=" justify-start text-base italic" >{nameukr?.slice(10)}</TextBlock>

				</CardBlock>




				<CardBlock
					className="grid grid-cols-2  w-1/2 "
				>


					<TextBlock
						className="px-8 justify-self-start text-2xl"
					>
						{pos?.palletTitle}
					</TextBlock>


					<CardBlock
						className="px-4 "
					>
						<CardBlock
							className="flex space-x-2"
						>
							<TextBlock className=" text-sm text-yellow-200 " ><BsBoxSeam /></TextBlock>
							<TextBlock className=" text-2xl text-yellow-200 " >{pos?.boxes}</TextBlock>

						</CardBlock>


						<CardBlock
							className="flex space-x-2"
						>
							<TextBlock className="justify-start text-sm  text-sky-200" ><BsBalloon /></TextBlock>
							<TextBlock className="justify-start text-2xl  text-sky-200" >{pos?.quant}</TextBlock>


						</CardBlock>






					</CardBlock>






				</CardBlock>





			</Link>









		</CardBlock>

	);
};

export default StockBage;