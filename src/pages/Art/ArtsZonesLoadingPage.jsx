import * as xlsx from "xlsx";
import React, { useState } from 'react';

import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import HeaderMainBTW from '../../components/UI/Page/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Page/Header/TitleHeaderMain';
import MainBTW from '../../components/UI/Page/MainBTW';
import PageBTW from '../../components/UI/Page/PageBTW';


import ButtonBlock from '../../components/blocks/ButtonBlock';


import axios from '../../utils/axios';

import ContentMain from '../../components/UI/Page/ContentMain';
import InputBlock from "../../components/blocks/InputBlock";



const ArtsZonesLoadingPage = () => {



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


			await axios.delete(`arts/zones`);

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



	function uploadClacter(claster) {

		let slice = arts.slice(1000 * claster, (1001 + 1000 * claster))

		slice.forEach(art => uploadArt(art))


	}




	function handlerUploadArts() {

		if (!arts) return


		let interval = setInterval(() => {
			setClaster(currentClaster => {
				if (currentClaster < clasters) {
					setIsUpload(true)
					uploadClacter(currentClaster)
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

			<HeaderMainBTW>
				<TitleHeaderMain>
					Установка зон
				</TitleHeaderMain>
			</HeaderMainBTW>




			<MainBTW>


				<ContentMain>

					<form className="flex justify-center items-center">

						<InputBlock
							className=""
							type="file"
							name="upload"
							id="upload"
							onChange={excelToJSON}
						/>

					</form>

					{arts.length != 0 && <div>

						<h2 className="m-6">Общее количество артикулов: {arts.length}</h2>
						<h2 className="m-6">Всего кластеров артикулов: {clasters} </h2>
						<h2 className="m-6">Текущий кластер на выгрузку: {claster} / {clasters} </h2>

					</div>}

					{isUpload && <h2 className="text-3xl mx-auto">ИДЕТ ВЫГРУЗКА... </h2>}


					<ButtonBlock
						className=" "
						onClick={handlerUploadArts}
					>

						Запустить выгрузку артикулов в базу

					</ButtonBlock>



					<ButtonBlock
						className=" "
						onClick={handlerDeleteArts}
					>

						УДАЛИТЬ АРТИКУЛЫ ИЗ БАЗЫ

					</ButtonBlock>



				</ContentMain>








				<ControlBTW>

				


				</ControlBTW>





			</MainBTW>







		</PageBTW>
	);
};

export default ArtsZonesLoadingPage;