import React from 'react';
import { Link } from 'react-router-dom';
import { CardBlock, ImageArt, TextBlock } from '../../components';
import { VscLocation } from "react-icons/vsc";
import { BsBalloon } from "react-icons/bs";





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


			className=' 
		flex  justify-center 
	w-full  space-x-2
		rounded-xl
		 text-sky-100 hover:text-white 
	 
		bg-emerald-700/30 
		 hover:shadow-2xl hover:shadow-emerald-500 
		 hover:bg-emerald-500 transition ease-in-out duration-300
	
		'

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
				className="hidden lg:flex items-center justify-start w-full space-x-4  "
				to={`/pallets/${pos?.pallet}`}
			>

				<TextBlock className=" justify-start text-xl italic" >{pos?.artikul}</TextBlock>
				<TextBlock className=" justify-start text-xl italic" >{nameukr?.slice(10)}</TextBlock>



			</Link>









		</CardBlock>

	);
};

export default StockBage;