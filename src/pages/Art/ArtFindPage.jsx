import React, { useEffect, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import useArts from '../../hooks/useFetchArts';

import PageBTW from '../../components/UI/Page/PageBTW';

import axios from "../../utils/axios";
import { toast } from 'react-toastify';

import { ButtonBlock, InputBlock, TextBlock, CardBlock, HeaderBlock, ImageBlock, RowBlock } from "../../components";






const ArtFindPage = () => {

	const navigate = useNavigate()


	const { artsDB, loadingArtsDB, errorArtsDB } = useArts();



	useEffect(() => {
		console.log("Загружены такие артикулы: ", artsDB)
		console.log(Array.isArray(artsDB))
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
		
			bg-rose-500/50
			" >
				Поиск артикула
			</HeaderBlock>








			<CardBlock className="bg-sky-400/50 p-2 text-center" >
				<h2 className='text-2xl'>Артикулы БТрейд</h2>

				{loadingArtsDB && <p>Загрузка данных...</p>}
				{artsDB && <p>Сейчас в базе данных БТрейд артикулов: <span className='text-lg bg-sky-500 p-1 rounded' >{artsDB.length} </span>  </p>}
			</CardBlock>

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
					className='cursor-pointer p-5 border border-teal-500 '
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



		</PageBTW >
	);
};

export default ArtFindPage;