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



	const [arts, setArts] = useState([]);
	const [claster, setClaster] = useState(0);




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



	function uploadClacter() {

		// 

	}




	function handlerUploadArts() {


		




		if (!arts) return

		// запустить на выгрузку первый кластер и создать его время 
		// создать сетИнтервал, который будет проверять время
		// если время будет отличаться на определенное количество милисекунд, то запускать выполнения следующего кластера
		// если кластер больше, чем количество кластеров, то выходить и очищать интервал





		// if (arts) {

		// 	let slice = arts.slice(1000 * claster, (1001 + 1000 * claster))

		// 	slice.forEach(art => uploadArt(art))

		// 	setClaster(prev => prev + 1)


		// }


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

					<h2 className="m-6">Общее количество артикулов: {arts.length}</h2>
					<h2 className="m-6">Всего кластеров артикулов: {clasters} </h2>



					{
						arts.length != 0 &&
						<button
							className="btn confirm m-6 p-4 rounded "
							onClick={handlerUploadArts}
						>

							{`Загрузить ${claster + 1} кластер артикулов`}

						</button>
					}



					<button
						className="btn delete m-6 p-4 rounded "
						onClick={handlerDeleteArts}
					>

						УДАЛИТЬ АРТИКУЛЫ ИЗ БАЗЫ

					</button>



				</ContentMain>








				<ControlBTW>

					{/* <button
						onClick={handlerUploadArts}
						className={`buttonBTW  ${arts && `success`}`}
						disabled={!arts}
					>

						Загрузить артикулы
					</button> */}


				</ControlBTW>





			</MainBTW>







		</PageBTW>
	);
};

export default ArtsZonesLoadingPage;