import * as xlsx from "xlsx";
import React, { useState } from 'react';

import ControlBTW from '../../components/UI/Page/Control/ControlBTW';
import HeaderMainBTW from '../../components/UI/Page/Header/HeaderMainBTW';
import TitleHeaderMain from '../../components/UI/Page/Header/TitleHeaderMain';
import MainBTW from '../../components/UI/Page/MainBTW';
import PageBTW from '../../components/UI/Page/PageBTW';


import axios from '../../utils/axios';

import ContentMain from '../../components/UI/Page/ContentMain';



const ArtsZonesLoadingPage = () => {



	const [arts, setArts] = useState("")





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





	async function handlerUploadArts() {

		if (!arts) return

		if (arts) {


			let slice = arts.slice(6000, 7001);
			await slice.forEach(art => uploadArt(art))



		}


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

						<input
							className="inputBTW"
							type="file"
							name="upload"
							id="upload"
							onChange={excelToJSON}
						/>

					</form>



					<button
						className="btn delete p-4 rounded "
						onClick={handlerDeleteArts}
					>

						УДАЛИТЬ АРТИКУЛЫ ИЗ БАЗЫ

					</button>








				</ContentMain>








				<ControlBTW>

					<button
						onClick={handlerUploadArts}
						className={`buttonBTW  ${arts && `success`}`}
						disabled={!arts}
					>

						Загрузить артикулы
					</button>


				</ControlBTW>





			</MainBTW>







		</PageBTW>
	);
};

export default ArtsZonesLoadingPage;