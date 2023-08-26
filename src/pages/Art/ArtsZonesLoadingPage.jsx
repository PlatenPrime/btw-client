import * as xlsx from "xlsx";
import React, { useEffect, useState } from 'react';
import useArts from "../../hooks/useFetchArts";

import ControlBTW from '../../components/UI/Page/Control/ControlBTW';

import MainBTW from '../../components/UI/Page/MainBTW';
import PageBTW from '../../components/UI/Page/PageBTW';


import ButtonBlock from '../../components/blocks/ButtonBlock';

import { toast } from 'react-toastify';
import axios from '../../utils/axios';

import ContentMain from '../../components/UI/Page/ContentMain';
import InputBlock from "../../components/blocks/InputBlock";
import HeaderBlock from "../../components/blocks/HeaderBlock";
import CardBlock from "../../components/blocks/CardBlock";
import TextBlock from "../../components/blocks/TextBlock";
import ImageBlock from "../../components/blocks/ImageBlock";




const ArtsZonesLoadingPage = () => {



	const { artsDB, loadingArtsDB, errorArtsDB } = useArts('arts');
	const [arts, setArts] = useState([]);
	const [claster, setClaster] = useState(0);
	const [isUpload, setIsUpload] = useState(false);

	const [count, setCount] = useState(1)



	const clasterLength = 500


	const clasters = Math.ceil(arts.length / clasterLength)

	// if (arts) {
	// 	console.log(...arts[count])
	// }



	const excelToJSON = (e) => {
		e.preventDefault();
		if (e.target.files) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const data = e.target.result;
				const workbook = xlsx.read(data, { type: "array" });
				const sheetName = workbook.SheetNames[0];
				const worksheet = workbook.Sheets[sheetName];
				const json = xlsx.utils.sheet_to_json(worksheet);
				console.log(json);
				setArts(json)
			};
			reader.readAsArrayBuffer(e.target.files[0]);
		}
	}








	async function handlerDeleteArts() {
		try {

			if (window.confirm("Удалить артикулы с базы данных?")) {
				await axios.delete(`arts/zones`);
				toast.info("Артикулы удалены с базы данных");
			}


		} catch (error) {
			console.log(error)
		}


	}




	async function createArt(art) {

		try {

			await axios.post(`arts/`, { ...art });

		} catch (error) {
			console.log(error)
		}
	}



	async function createOrUpdateArt(art) {

		try {

			await axios.post(`arts/update`, { ...art });

		} catch (error) {
			console.log(error)
		}
	}






	function uploadClaster(claster) {

		let slice = arts.slice(clasterLength * claster, (clasterLength + 1 + clasterLength * claster))

		slice.forEach(art => createOrUpdateArt(art))


	}




	function handlerUploadArts() {

		if (!arts) return


		let interval = setInterval(() => {
			setClaster(currentClaster => {
				if (currentClaster < clasters) {
					setIsUpload(true)
					uploadClaster(currentClaster)
					toast.success(`Кластер ${currentClaster + 1} загружен`)
					return currentClaster + 1;
				} else {
					setIsUpload(false)
					clearInterval(interval);
					return currentClaster;
				}
			});
		}, 10000);


	}











	return (
		<PageBTW>

			<HeaderBlock className='bg-cyan-500'>

				Установка зон

			</HeaderBlock>




			<MainBTW>


				<ContentMain>


					<CardBlock className="bg-sky-400/50" >
						<h2 className='text-2xl'>Артикулы БТрейд</h2>

						{loadingArtsDB && <p>Загрузка данных...</p>}
						{artsDB && <p>Сейчас в базе данных БТрейд артикулов: <span className='text-lg bg-sky-500 p-1 rounded' >{artsDB.length} </span>  </p>}


						{/* <ButtonBlock
							className="delete flex justify-center "
							onClick={handlerDeleteArts}
						>

							Удалить артикулы с БД

						</ButtonBlock> */}

					</CardBlock>


					<CardBlock>
						<TextBlock className="p-2" >
							Выгрузи прайслист с 1с и  подготовь файл excel с полями как на картинке. Не должно быть артикулов без зон.
						</TextBlock>
						<ImageBlock
							src="https://i.imgur.com/rxPEjmi.png"
							alt='Excel пример'
							width={600}
							height={600}
							className="mx-auto  p-2"

						/>
					</CardBlock>


					<CardBlock className=" flex justify-center items-center ">

						<InputBlock
							className=""
							type="file"
							name="upload"
							id="upload"
							onChange={excelToJSON}
						/>

					</CardBlock>


					{arts.length != 0 && <CardBlock>

						<TextBlock className="m-6">Артикулов на загрузку: {arts.length}</TextBlock>
						<TextBlock className="m-6">Кластеры: {clasters} </TextBlock>
						<TextBlock className="m-6">Текущий кластер на выгрузку: {claster} / {clasters} </TextBlock>

						<ButtonBlock
							className="create-c w-full "
							onClick={handlerUploadArts}
						>

							Запустить выгрузку артикулов

						</ButtonBlock>


					</CardBlock>}

					{isUpload && <TextBlock className="text-3xl mx-auto">ИДЕТ ВЫГРУЗКА... </TextBlock>}


					{/* <CardBlock>
						<ButtonBlock
							onClick={() => {

								const artup = { ...arts[count] }

								createOrUpdateArt(artup)
								setCount(prev => prev + 1)
							}}

						>
							Выгрузить артикул
						</ButtonBlock>
						<p>{count}</p>
					</CardBlock> */}


				</ContentMain>




				<ControlBTW>

				</ControlBTW>

			</MainBTW>

		</PageBTW>
	);
};

export default ArtsZonesLoadingPage;