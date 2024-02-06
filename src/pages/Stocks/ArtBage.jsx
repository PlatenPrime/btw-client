import React from 'react';
import { Link } from 'react-router-dom';
import { CardBlock, ImageArt, TextBlock } from '../../components';
import { VscLocation } from "react-icons/vsc";
import { BsBalloon } from "react-icons/bs";





const ArtBage = ({ art, remains }) => {





	if (!art) {
		return (
			<TextBlock className='text-center text-3xl'>
				Загрузка...
			</TextBlock>
		)
	}


	const title = art?.artikul


	return (

		<CardBlock


			className=' 
		flex  justify-center 
	w-full  space-x-2
		rounded-xl
		 text-sky-100 hover:text-white 
	 
		bg-sky-700/30 
		 hover:shadow-2xl hover:shadow-sky-500 
		 hover:bg-sky-500 transition ease-in-out duration-300
	
		'

		>




			<CardBlock
				className="flex items-center bg-white rounded-l-xl rounded-r-none p-1"
			>

				<ImageArt size={50} artikul={art?.artikul} className="rounded-l-xl" />

			</CardBlock>


			<Link
				className="  w-full flex flex-col lg:hidden  space-y-4 p-2"
				to={`/arts/${art?._id}`}
			>

				<TextBlock className="justify-start text-xl italic " >{art?.nameukr}</TextBlock>

				<CardBlock
					className="flex flex-wrap justify-between"
				>
					<TextBlock className=" text-xl font-bold  bg-orange-300 p-1 rounded" ><VscLocation />{art?.zone}</TextBlock>
					<TextBlock className=" text-xl font-bold " > <BsBalloon /> {remains ? remains[title] : ""}</TextBlock>
				</CardBlock>

			</Link>




			<Link
				className="hidden lg:flex items-center justify-between w-full  "
				to={`/arts/${art?._id}`}
			>

				<TextBlock className=" justify-start text-xl italic" >{art?.nameukr}</TextBlock>

				<CardBlock
				className = "flex w-1/3 justify-between px-2"
				>
					<TextBlock className="  text-xl font-bold border border-orange-300 p-1 rounded text-orange-300" ><VscLocation />{art?.zone}</TextBlock>
					<TextBlock className=" text-xl font-bold " ><BsBalloon />  {remains ? remains[title] : ""}</TextBlock>
				</CardBlock>

			</Link>









		</CardBlock>

	);
};

export default ArtBage;