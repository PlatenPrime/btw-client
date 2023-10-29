import React from 'react';
import { Link } from 'react-router-dom';
import { CardBlock, ImageArt, TextBlock } from '../../components';





const ArtBage = ({ art }) => {



	if (!art) {
		return (
			<TextBlock className='text-center text-3xl'>
				Загрузка...
			</TextBlock>
		)
	}



	return (

		<CardBlock


			className=' 
		flex  justify-center 
	w-full  space-x-2
		rounded
		 text-sky-100 hover:text-white 
		bg-sky-500/10  
		border-2 border-sky-500 
		 hover:shadow-2xl hover:shadow-sky-500 
		 hover:bg-sky-500 transition ease-in-out duration-300
		 transition ease-in-out duration-300
		'

		>




			<CardBlock
				className="h-full bg-white"
			>

				<ImageArt size={80} artikul={art?.artikul} />

			</CardBlock>


			<Link
				className="  w-full flex flex-col lg:hidden  space-y-4 p-2"
				to={`/arts/${art?._id}`}
			>

				<TextBlock className="justify-start text-xl " >{art?.nameukr}</TextBlock>

				<CardBlock
					className="flex flex-wrap justify-between"
				>
					<TextBlock className=" text-xl font-bold  bg-orange-500 px-1 rounded" >{art?.zone}</TextBlock>
					<TextBlock className=" text-xl font-bold " >Залишок</TextBlock>
				</CardBlock>

			</Link>




			<Link
				className="hidden lg:flex  w-full  "
				to={`/arts/${art?._id}`}
			>

				<TextBlock className="w-2/3 justify-start text-xl" >{art?.nameukr}</TextBlock>
				<TextBlock className="w-1/6 text-xl font-bold text-orange-500" >{art?.zone}</TextBlock>
				<TextBlock className="w-1/6 text-xl font-bold " >Залишок</TextBlock>

			</Link>




		




		</CardBlock>

	);
};

export default ArtBage;