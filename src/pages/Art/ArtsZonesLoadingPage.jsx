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




const ArtsZonesLoadingPage = () => {



	const { artsDB, loadingArtsDB, errorArtsDB } = useArts('arts');




	const [arts, setArts] = useState([]);
	const [claster, setClaster] = useState(0);
	const [isUpload, setIsUpload] = useState(false);





	const clasters = Math.ceil(arts.length / 1000)





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




	async function uploadArt(art) {

		try {

			await axios.post(`arts/`, { ...art });

		} catch (error) {
			console.log(error)
		}
	}



	function uploadClaster(claster) {

		let slice = arts.slice(1000 * claster, (1001 + 1000 * claster))

		slice.forEach(art => uploadArt(art))


	}




	function handlerUploadArts() {

		if (!arts) return


		let interval = setInterval(() => {
			setClaster(currentClaster => {
				if (currentClaster < clasters) {
					setIsUpload(true)
					uploadClaster(currentClaster)
					toast.success(`Кластер ${currentClaster} загружен`)
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

					<CardBlock className="flex flex-col justify-center " >

						<TextBlock>
							Сейчас в БД артикулов:
							{loadingArtsDB ? "Загрузка..." : artsDB.length}
						</TextBlock>

						<ButtonBlock
							className="delete flex justify-center "
							onClick={handlerDeleteArts}
						>

							Удалить артикулы с БД

						</ButtonBlock>

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


				</ContentMain>

				<ControlBTW>

				</ControlBTW>

			</MainBTW>

		</PageBTW>
	);
};

export default ArtsZonesLoadingPage;