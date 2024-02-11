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

${ pos.quant  ? "bg-emerald-700/30 hover:shadow-emerald-500 hover:bg-emerald-500  " : "bg-slate-700/30 hover:shadow-slate-500 hover:bg-slate-500  " }
				 
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
					className="flex"
				>




					<CardBlock
						className="flex flex-col items-end px-4"
					>
						<TextBlock className="justify-start text-xl text-yellow-200 " >{pos?.boxes}<BsBoxSeam /></TextBlock>
						<TextBlock className="justify-start text-xl  text-sky-200" >{pos?.quant}<BsBalloon /></TextBlock>
					</CardBlock>

					<TextBlock
					className="px-8 text-xl"
					>{pos?.palletTitle}</TextBlock>



				</CardBlock>





			</Link>









		</CardBlock>

	);
};

export default StockBage;