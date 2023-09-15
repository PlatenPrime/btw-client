import React, { useEffect, useRef, useState } from 'react';

import * as XLSX from 'xlsx';



import { useNavigate } from 'react-router-dom';
import useArts from '../../hooks/useFetchArts';

import PageBTW from '../../components/UI/Page/PageBTW';


import axios from "../../utils/axios";
import { toast } from 'react-toastify';

import ButtonBlock from '../../components/blocks/ButtonBlock';
import InputBlock from '../../components/blocks/InputBlock';
import HeaderBlock from '../../components/blocks/HeaderBlock';
import CardBlock from '../../components/blocks/CardBlock';
import ImageBlock from '../../components/blocks/ImageBlock';
import RowBlock from '../../components/blocks/RowBlock';
import TextBlock from '../../components/blocks/TextBlock';







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









	function downloadFile(blob, filename) {
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename || 'downloaded_file.xlsx';
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
	}


	const handleDownloadExcel = () => {
		console.log("artsDB:", artsDB); // Добавьте это логирование


		const workbook = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(artsDB);

		try {
			// Попытайтесь создать Blob
			const blob = XLSX.write(workbook, { bookType: 'blob', type: 'blob' });

			// Проверьте, что Blob создан успешно
			if (blob) {
				// Вызов функции для скачивания файла
				downloadFile(blob, 'artsDB.xlsx');
			} else {
				console.error('Не удалось создать Blob для Excel-файла.');
			}
		} catch (error) {
			console.error('Произошла ошибка при создании Excel-файла:', error);
		}
	};







	return (


		<PageBTW


		>


			<HeaderBlock className="
		
			bg-teal-500/50
			" >
				Поиск артикула
			</HeaderBlock>








			<CardBlock className="bg-sky-400/50" >
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



			<CardBlock>


				<button onClick={handleDownloadExcel}>Скачать Excel-файл</button>

			</CardBlock>


		</PageBTW >
	);
};

export default ArtFindPage;