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





	const handlerUpload = () => {



	}




	const uploadArts = async (title, zone, name) => {

		try {

			await axios.post(`arts`, { title, zone, name });

		} catch (error) {

			console.log(error)

		}

	}





	// Удаляй артикулы только в процессе загрузки новых, отдельной кнопки не нужно


	const removeArts = async () => {
		try {

			// setIsLoading(true);
			await axios.delete(`arts/zones`);
			// setIsLoading(false);

		} catch (error) {
			console.log(error)
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

					<form className="flex justify-center items-center h-full">

						<input
							className="inputBTW"
							type="file"
							name="upload"
							id="upload"
							onChange={excelToJSON}
						/>

					</form>







				</ContentMain>








				<ControlBTW>

					<button
						onClick={handlerUpload}
						className={`buttonBTW  ${arts && `success`}`}
						disabled={!arts}
					>

						Обновить артикулы
					</button>


				</ControlBTW>





			</MainBTW>







		</PageBTW>
	);
};

export default ArtsZonesLoadingPage;