import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


import ControlBTW from '../../components/UI/Page/Control/ControlBTW';


import MainBTW from '../../components/UI/Page/MainBTW';


import PageBTW from '../../components/UI/Page/PageBTW';

import { checkIsAuth } from '../../redux/features/auth/authSlice';
import axios from "../../utils/axios";
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
	const isAuth = useSelector(checkIsAuth)



	const [arts, setArts] = useState("");

	const fetchArts = async () => {
		try {

			const { data } = await axios.get(`arts`);
			setArts(data.arts)


		} catch (error) {
			console.log(error)
		}
	}


	useEffect(() => {
		fetchArts()
	}, [])


	useEffect(() => {
		console.log("Загружены такие артикулы: ", arts)
	}, [arts])









	const artInput = useRef("");

	const [artItem, setArtItem] = useState('')
	const [artCardDisplay, setArtCartDisplay] = useState(false)



	const handlerArtFind = (e) => {

		e.preventDefault();


		const art = arts.find(item => item.title === artInput.current.value)



		if (art != undefined) {
			setArtItem(art)
			setArtCartDisplay(true)
		} else {
			window.alert("Такого артикула нет")
			console.log(artInput.current.value)
		}





	}


	const photo = `https://sharik.ua/images/elements_big/${artItem.title}_m1.jpg`;

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

						<CardBlock className='flex flex-row justify-center items-center  p-4 '>

							<InputBlock 
							className='p-2 text-2xl text-center  text-green-800 focus:border-green-800 ' 
							type="text" 
							ref={artInput} 
							placeholder="ХХХХ-ХХХХ"
							/>




							<ButtonBlock

								className='search p-3'
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


							<RowBlock className=' m-2 pr-5 rounded flex flex-col  md:flex-row items-center justify-start space-x-10 hover:bg-teal-200 '>


								<ImageBlock
									src={photo}
									alt="Здесь должно быть изображение артикула"
									width="200px"
									height="200px"
									className='rounded hover:scale-125 hover:translate-x-3 ' />



								<TextBlock className='text-xl' >{artItem.name}</TextBlock>



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