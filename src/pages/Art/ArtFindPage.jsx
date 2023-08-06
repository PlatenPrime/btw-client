import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import useArts from '../../hooks/useFetchArts';


import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import MainBTW from '../../components/UI/Page/MainBTW';
import PageBTW from '../../components/UI/Page/PageBTW';


import axios from "../../utils/axios";
import { toast } from 'react-toastify';


import ContentMain from '../../components/UI/Page/ContentMain';
import ButtonBlock from '../../components/blocks/ButtonBlock';
import InputBlock from '../../components/blocks/InputBlock';
import HeaderBlock from '../../components/blocks/HeaderBlock';
import CardBlock from '../../components/blocks/CardBlock';
import ImageBlock from '../../components/blocks/ImageBlock';
import RowBlock from '../../components/blocks/RowBlock';
import TextBlock from '../../components/blocks/TextBlock';







const ArtFindPage = () => {

	const navigate = useNavigate()


	const { artsDB, loadingArtsDB, errorArtsDB } = useArts('arts');



	useEffect(() => {
		console.log("Загружены такие артикулы: ", artsDB)
	}, [artsDB])









	const artInput = useRef("");

	const [artItem, setArtItem] = useState('')
	const [artCardDisplay, setArtCartDisplay] = useState(false)



	const handlerArtFind = (e) => {

		e.preventDefault();


		const art = artsDB.find(item => item.artikul === artInput.current.value)

		if (!artInput.current.value) {
			toast.error("Введи артикул")
		} else if (art) {
			setArtItem(art)
			setArtCartDisplay(true)
		} else {
			toast.error("Такого артикула нет")
			console.log(artInput.current.value)
		}





	}


	const photo = `https://sharik.ua/images/elements_big/${artItem.artikul}_m1.jpg`;

	return (


		<PageBTW


		>


			<HeaderBlock className="
		
			bg-gradient-to-r from-green-500 to-teal-500
			" >
				Поиск артикула
			</HeaderBlock>



			<MainBTW>



				<ContentMain>

					<form onSubmit={handlerArtFind}>

						<CardBlock className='flex flex-col md:flex-row justify-center items-center  p-4 '>

							<InputBlock
								className='p-2 text-2xl text-center  text-white '
								type="text"
								ref={artInput}
								placeholder="ХХХХ-ХХХХ"
							/>




							<ButtonBlock

								className='search p-3 my-1'
								type="submit"
							>
								Найти артикул
							</ButtonBlock>

						</CardBlock>

					</form>


					{artCardDisplay && artItem &&
						<CardBlock
							className='cursor-pointer p-5'
							onClick={() => navigate(`/arts/${artItem._id}`)}
						>


							<RowBlock className='
						
							m-2 pr-5 rounded 
							flex flex-col  md:flex-row items-center justify-start 
						hover:text-2xl
							space-x-10 hover:bg-teal-500 
							hover:shadow-2xl hover:shadow-teal-500
							
							'>


								<ImageBlock
									src={photo}
									alt="Здесь должно быть изображение артикула"
									width="100px"
									height="100px"
									className='rounded 
									hover:scale-150 hover:translate-x-3 duration-500
									hover:shadow-xl hover:shadow-white ' />



								<TextBlock className='text-xl' >{artItem.nameukr}</TextBlock>
								{/* <TextBlock className='text-xl' >{artItem.namerus}</TextBlock> */}



							</RowBlock>





						</CardBlock>
					}








				</ContentMain>




				<ControlBTW>



				</ControlBTW>


			</MainBTW>









		</PageBTW >
	);
};

export default ArtFindPage;